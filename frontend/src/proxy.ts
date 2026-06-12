import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  NextResponse,
  NextRequest,
  NextFetchEvent,
  NextMiddleware,
} from "next/server";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const normalizedPath = path.replace(/^\/(pl|en)/, "");

    // Direct user based on role if they try to access specialized dashboards
    if (
      normalizedPath.startsWith("/dashboard/coach") &&
      token?.role !== "coach" &&
      token?.role !== "admin"
    ) {
      const localeMatch = path.match(/^\/(pl|en)/);
      const localePrefix = localeMatch ? localeMatch[0] : "";
      return NextResponse.redirect(
        new URL(`${localePrefix}/dashboard`, req.url),
      );
    }

    if (
      normalizedPath.startsWith("/dashboard/admin") &&
      token?.role !== "admin"
    ) {
      const localeMatch = path.match(/^\/(pl|en)/);
      const localePrefix = localeMatch ? localeMatch[0] : "";
      return NextResponse.redirect(
        new URL(`${localePrefix}/dashboard`, req.url),
      );
    }

    // Run intlMiddleware for authorized requests to handle internal locale routing
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Requires active session for all matched routes
    },
  },
);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  const normalizedPath = path.replace(/^\/(pl|en)/, "");

  // Run authMiddleware for dashboard paths, otherwise run intlMiddleware
  if (normalizedPath.startsWith("/dashboard")) {
    return (authMiddleware as NextMiddleware)(req, event);
  }

  return intlMiddleware(req);
}

export const config = {
  // Match both internationalized paths and dashboard paths
  matcher: [
    // Next-intl matchers
    "/",
    "/(pl|en)/:path*",
    // Dashboard matchers (including optional locale prefixes)
    "/dashboard/:path*",
    "/(pl|en)/dashboard/:path*",
  ],
};
