import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en-GB|fr|es|pt|de|it|zh|ja|ru|ko|hi|ar)/:path*']
};
