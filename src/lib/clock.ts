/**
 * Format a time string for the status bar / header clock.
 * en-GB → 12-hour with AM/PM; any other locale → 24-hour.
 * (Extracted verbatim from the original Header inline logic so behaviour is unchanged.)
 */
export function formatClock(date: Date, locale: string): string {
  if (locale === 'en-GB') {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false });
}
