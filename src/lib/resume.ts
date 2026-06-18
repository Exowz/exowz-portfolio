// The CV/résumé exists only in French and English. Every non-French locale
// falls back to the English PDF, so the link never 404s on the other locales.
export function resumeHref(locale: string): string {
  return `/resume-${locale === 'fr' ? 'fr' : 'en-GB'}.pdf`;
}
