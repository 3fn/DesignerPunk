#!/usr/bin/env bash
# boot-and-test.sh <api> -- steps 6 and 7 of the render probe for one API level (run by
# .github/workflows/android-render-probe.yml; grant .kiro/issues/2026-11-27-android-render-probe-workflow-grant.md).
# Creates an AVD from system-images;android-<api>;default;x86_64, boots it headless, times the wait for
# sys.boot_completed=1 (capped at 600 s), runs connectedDebugAndroidTest, and stops the emulator. It answers no
# prompt: avdmanager reads stdin from /dev/null. Each result is one `render-probe:` line in $OUT/summary.txt.
set -u
api="$1"
s="$OUT/summary.txt"
logs="$OUT/logs"
img="system-images;android-${api};default;x86_64"
avd="probe${api}"
serial="emulator-5554"
adb="$ANDROID_HOME/platform-tools/adb"
emu="$ANDROID_HOME/emulator/emulator"
avdm="$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager"
# One AVD home for avdmanager and the emulator. The first run (46039771588) created the AVD where the emulator did
# not look ("no file probe26.ini in $HOME/.android/avd").
export ANDROID_AVD_HOME="$OUT/avd"
mkdir -p "$ANDROID_AVD_HOME"

if [ ! -d "$ANDROID_HOME/system-images/android-${api}/default/x86_64" ] || [ ! -x "$emu" ]; then
  echo "render-probe: boot-api${api}=SKIP (system image or emulator not installed)" >> "$s"
  exit 1
fi

if ! "$avdm" create avd --force -n "$avd" -k "$img" -d pixel < /dev/null > "$logs/avdmanager-api${api}.txt" 2>&1; then
  echo "render-probe: avd-api${api}=FAIL" >> "$s"
  exit 1
fi

t0=$(date +%s)
"$emu" -avd "$avd" -no-window -no-audio -no-boot-anim -no-snapshot -gpu swiftshader_indirect -port 5554 \
  > "$logs/emulator-api${api}.txt" 2>&1 &
emu_pid=$!

booted=no
for _ in $(seq 1 120); do
  if ! kill -0 "$emu_pid" 2>/dev/null; then break; fi
  if [ "$("$adb" -s "$serial" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; then booted=yes; break; fi
  sleep 5
done
secs=$(( $(date +%s) - t0 ))

if [ "$booted" != yes ]; then
  echo "render-probe: boot-api${api}=FAIL seconds=${secs} emulator=$(grep -i -E 'error|fatal|kvm|accel' "$logs/emulator-api${api}.txt" | head -n 1 | cut -c1-160)" >> "$s"
  kill "$emu_pid" 2>/dev/null || true
  exit 1
fi
echo "render-probe: boot-api${api}=ok seconds=${secs}" >> "$s"

t1=$(date +%s)
if ANDROID_SERIAL="$serial" harness/android/gradlew -p harness/android/render-probe --no-daemon connectedDebugAndroidTest \
  > "$logs/instrumented-api${api}.txt" 2>&1; then
  echo "render-probe: instrumented-api${api}=PASS seconds=$(( $(date +%s) - t1 ))" >> "$s"
  rc=0
else
  echo "render-probe: instrumented-api${api}=FAIL seconds=$(( $(date +%s) - t1 )) last=$(grep -E 'FAIL|error|Exception' "$logs/instrumented-api${api}.txt" | head -n 1 | cut -c1-160)" >> "$s"
  rc=1
fi

"$adb" -s "$serial" emu kill > /dev/null 2>&1 || kill "$emu_pid" 2>/dev/null || true
wait "$emu_pid" 2>/dev/null || true
tail -n 2 "$s"
exit "$rc"
