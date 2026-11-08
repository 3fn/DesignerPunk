/**
 * Badge-Count-Notification Component Index
 * 
 * Stemma System naming: [Family]-[Type]-[Variant] = Badge-Count-Notification
 * Type: Semantic Variant (inherits from Badge-Count-Base)
 * 
 * Badge-Count-Notification is a semantic variant that extends Badge-Count-Base
 * with notification-specific styling and live region announcements for screen
 * readers. It uses predefined notification color tokens and automatically
 * announces count changes to assistive technologies.
 * 
 * Key Characteristics:
 * - Inherits all Badge-Count-Base behavior (count display, max truncation, showZero)
 * - Fixed notification colors (pink400 background, white100 text)
 * - Live region announcements for accessibility
 * - Pluralized announcement text ("1 notification", "5 notifications")
 * - Optional announceChanges prop (default: true)
 * 
 * COLOR TOKENS (Spec 058):
 * Badge notification colors are a map of semantic-token references, kept in this
 * component directory in ./badgeNotificationColorMap.ts. It is not a component token
 * file (no defineComponentTokens call), so it does not wear the tokens.ts name.
 * 
 * @see ./README.md for complete documentation
 * @see ./badgeNotificationColorMap.ts for the color reference map
 * @see .kiro/specs/044-badge-base for design specification
 * @see .kiro/specs/058-component-token-architecture-cleanup for color token migration
 * @see .kiro/specs/034-component-architecture-system for Stemma System details
 */

// Types
export { 
  BadgeCountNotificationProps,
  BadgeCountSize,
  BADGE_COUNT_NOTIFICATION_DEFAULTS,
} from './types';

// Component Tokens (Spec 058 - canonical location per Rosetta System architecture)
export {
  BadgeNotificationColorTokens,
  BadgeNotificationColorTokenKey,
  getBadgeNotificationColorToken,
  BadgeNotificationTokenReferences,
} from './badgeNotificationColorMap';

// Web Platform Implementation
export { BadgeCountNotification } from './platforms/web/BadgeCountNotification.web';

// Platform implementations:
// - Web: BadgeCountNotification (Task 4.2) - complete
// - iOS: BadgeCountNotification (Task 4.3) - complete
// - Android: BadgeCountNotification (Task 4.4) - complete
//
// Platform Token Usage:
// - Colors are the two semantic tokens named in ./badgeNotificationColorMap.ts
//   (color.feedback.notification.background and .text). No platform reads
//   DesignTokens.colorBadgeNotification*.
