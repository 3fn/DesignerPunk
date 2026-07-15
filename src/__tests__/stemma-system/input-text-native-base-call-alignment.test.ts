/**
 * Input-Text Native Base-Call Alignment Validation
 *
 * Static analysis tests that validate the native (iOS/Android) Input-Text
 * semantic variants call InputTextBase with parameters the base actually
 * declares. The native platform files are NOT compiled in CI — Swift/Kotlin
 * sources are only validated by static-analysis Jest tests — so a call-site
 * passing an undeclared parameter (or referencing a nonexistent enum member)
 * would not compile on a real platform build but previously went undetected.
 *
 * Catches:
 * - Callers passing named arguments the base does not declare
 *   (e.g., `trailingContent` before the base grew that slot)
 * - iOS callers passing memberwise-init arguments out of declaration order
 * - References to InputType enum members that do not exist
 *   (e.g., `InputType.PHONE` when the enum defines TEL)
 *
 * Stemma System: Form Inputs Family
 */

import * as fs from 'fs';
import * as path from 'path';

const CORE = path.join(__dirname, '../../components/core');

const IOS_BASE = path.join(CORE, 'Input-Text-Base/platforms/ios/InputTextBase.ios.swift');
const ANDROID_BASE = path.join(CORE, 'Input-Text-Base/platforms/android/InputTextBase.android.kt');

const IOS_CALLERS = [
  'Input-Text-Password/platforms/ios/InputTextPassword.ios.swift',
  'Input-Text-Email/platforms/ios/InputTextEmail.ios.swift',
  'Input-Text-PhoneNumber/platforms/ios/InputTextPhoneNumber.ios.swift',
].map((p) => path.join(CORE, p));

const ANDROID_CALLERS = [
  'Input-Text-Password/platforms/android/InputTextPassword.android.kt',
  'Input-Text-Email/platforms/android/InputTextEmail.android.kt',
  'Input-Text-PhoneNumber/platforms/android/InputTextPhoneNumber.android.kt',
].map((p) => path.join(CORE, p));

// ---------------------------------------------------------------------------
// Source scanning helpers (string- and comment-aware, brace/paren-depth aware)
// ---------------------------------------------------------------------------

/**
 * Extract the balanced-parentheses body starting at `openParenIndex`
 * (which must point at a '('). Skips string literals and line comments.
 */
function extractParenBody(source: string, openParenIndex: number): string {
  let depth = 0;
  for (let i = openParenIndex; i < source.length; i++) {
    const ch = source[i];
    if (ch === '"') {
      // Skip string literal (handles escapes)
      i++;
      while (i < source.length && source[i] !== '"') {
        if (source[i] === '\\') i++;
        i++;
      }
    } else if (ch === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i++;
    } else if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth--;
      if (depth === 0) {
        return source.slice(openParenIndex + 1, i);
      }
    }
  }
  throw new Error('Unbalanced parentheses in source');
}

/**
 * Split an argument/parameter list into top-level entries — commas nested
 * inside (), {}, [], strings, or line comments do not split.
 */
function splitTopLevel(body: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '"') {
      current += ch;
      i++;
      while (i < body.length && body[i] !== '"') {
        if (body[i] === '\\') {
          current += body[i];
          i++;
        }
        current += body[i];
        i++;
      }
      current += body[i] ?? '';
    } else if (ch === '/' && body[i + 1] === '/') {
      while (i < body.length && body[i] !== '\n') i++;
      current += '\n';
    } else if ('({['.includes(ch)) {
      depth++;
      current += ch;
    } else if (')}]'.includes(ch)) {
      depth--;
      current += ch;
    } else if (ch === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

/** Find every `InputTextBase(...)` call in a source file and return its args. */
function extractBaseCalls(source: string): string[][] {
  const calls: string[][] = [];
  const re = /\bInputTextBase\(/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source)) !== null) {
    const body = extractParenBody(source, match.index + match[0].length - 1);
    calls.push(splitTopLevel(body));
    re.lastIndex = match.index + match[0].length;
  }
  return calls;
}

/** Labels of named arguments: Swift `label: value` / Kotlin `name = value`. */
function argLabel(arg: string, platform: 'ios' | 'android'): string | null {
  const m =
    platform === 'ios'
      ? arg.match(/^\s*(\w+)\s*:/)
      : arg.match(/^\s*(\w+)\s*=(?!=)/);
  return m ? m[1] : null;
}

// ---------------------------------------------------------------------------
// Base declaration parsers
// ---------------------------------------------------------------------------

/**
 * iOS base: settable stored properties of the InputTextBase struct, in
 * declaration order. These define the memberwise initializer, so caller
 * argument labels must be an in-order subsequence of this list.
 * Excludes private state (@State/@FocusState/@Environment are all private)
 * and the `body` computed property.
 */
function parseIOSBaseProperties(source: string): string[] {
  const structStart = source.indexOf('struct InputTextBase: View {');
  const bodyStart = source.indexOf('var body: some View', structStart);
  const section = source.slice(structStart, bodyStart);
  const props: string[] = [];
  for (const line of section.split('\n')) {
    if (line.includes('private')) continue;
    const m = line.match(/^\s*(?:@Binding\s+)?(?:let|var)\s+(\w+)\s*[:=]/);
    if (m) props.push(m[1]);
  }
  return props;
}

/** Android base: parameter names of the InputTextBase composable function. */
function parseAndroidBaseParams(source: string): string[] {
  const funIndex = source.indexOf('fun InputTextBase(');
  const body = extractParenBody(source, funIndex + 'fun InputTextBase'.length);
  return splitTopLevel(body)
    .map((p) => p.match(/^\s*(\w+)\s*:/)?.[1])
    .filter((name): name is string => Boolean(name));
}

/** Enum members: Swift `case xyz` / Kotlin `enum class InputType { A, B }`. */
function parseInputTypeMembers(source: string, platform: 'ios' | 'android'): string[] {
  if (platform === 'ios') {
    const enumStart = source.indexOf('enum InputType {');
    const enumBody = source.slice(enumStart, source.indexOf('}', enumStart));
    return [...enumBody.matchAll(/case\s+(\w+)/g)].map((m) => m[1]);
  }
  const enumMatch = source.match(/enum class InputType \{([^}]*)\}/);
  if (!enumMatch) return [];
  return enumMatch[1]
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
}

/** Assert `subset` appears within `sequence` in order (subsequence check). */
function isInOrderSubsequence(subset: string[], sequence: string[]): boolean {
  let cursor = 0;
  for (const item of subset) {
    const found = sequence.indexOf(item, cursor);
    if (found === -1) return false;
    cursor = found + 1;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Input-Text native base-call alignment', () => {
  const iosBaseSource = fs.readFileSync(IOS_BASE, 'utf-8');
  const androidBaseSource = fs.readFileSync(ANDROID_BASE, 'utf-8');

  const iosBaseProps = parseIOSBaseProperties(iosBaseSource);
  const androidBaseParams = parseAndroidBaseParams(androidBaseSource);
  const iosEnumMembers = parseInputTypeMembers(iosBaseSource, 'ios');
  const androidEnumMembers = parseInputTypeMembers(androidBaseSource, 'android');

  describe('base declaration parsing (sanity)', () => {
    it('parses the iOS base memberwise properties', () => {
      expect(iosBaseProps).toEqual(
        expect.arrayContaining(['id', 'label', 'value', 'type', 'isDisabled', 'trailingContent'])
      );
      expect(iosBaseProps.length).toBeGreaterThanOrEqual(15);
    });

    it('parses the Android base composable parameters', () => {
      expect(androidBaseParams).toEqual(
        expect.arrayContaining(['id', 'label', 'value', 'type', 'visualTransformation', 'trailingContent'])
      );
      expect(androidBaseParams.length).toBeGreaterThanOrEqual(15);
    });

    it('parses the InputType enums on both platforms', () => {
      expect(iosEnumMembers).toEqual(['text', 'email', 'password', 'tel', 'url']);
      expect(androidEnumMembers).toEqual(['TEXT', 'EMAIL', 'PASSWORD', 'TEL', 'URL']);
    });
  });

  describe('iOS callers', () => {
    // The iOS base preview also exercises the memberwise initializer
    const files = [...IOS_CALLERS, IOS_BASE];

    files.forEach((file) => {
      const name = path.basename(file);

      it(`${name}: every InputTextBase argument is a declared property, in declaration order`, () => {
        const source = fs.readFileSync(file, 'utf-8');
        const calls = extractBaseCalls(source);
        expect(calls.length).toBeGreaterThan(0);

        calls.forEach((args) => {
          const labels = args
            .map((a) => argLabel(a, 'ios'))
            .filter((l): l is string => Boolean(l));

          const undeclared = labels.filter((l) => !iosBaseProps.includes(l));
          expect(undeclared).toEqual([]);

          // Memberwise init requires arguments in property declaration order
          expect(isInOrderSubsequence(labels, iosBaseProps)).toBe(true);
        });
      });

      it(`${name}: type argument references a declared InputType case`, () => {
        const source = fs.readFileSync(file, 'utf-8');
        extractBaseCalls(source).forEach((args) => {
          const typeArg = args.find((a) => argLabel(a, 'ios') === 'type');
          if (!typeArg) return;
          const caseMatch = typeArg.match(/:\s*\.(\w+)/);
          if (caseMatch) {
            expect(iosEnumMembers).toContain(caseMatch[1]);
          }
        });
      });
    });
  });

  describe('Android callers', () => {
    ANDROID_CALLERS.forEach((file) => {
      const name = path.basename(file);

      it(`${name}: every InputTextBase named argument is a declared parameter`, () => {
        const source = fs.readFileSync(file, 'utf-8');
        const calls = extractBaseCalls(source);
        expect(calls.length).toBeGreaterThan(0);

        calls.forEach((args) => {
          const labels = args
            .map((a) => argLabel(a, 'android'))
            .filter((l): l is string => Boolean(l));
          expect(labels.length).toBeGreaterThan(0);

          const undeclared = labels.filter((l) => !androidBaseParams.includes(l));
          expect(undeclared).toEqual([]);
        });
      });

      it(`${name}: every InputType reference is a declared enum member`, () => {
        const source = fs.readFileSync(file, 'utf-8');
        const refs = [...source.matchAll(/\bInputType\.(\w+)/g)].map((m) => m[1]);
        const unknown = refs.filter((r) => !androidEnumMembers.includes(r));
        expect(unknown).toEqual([]);
      });
    });
  });
});
