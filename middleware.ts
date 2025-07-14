import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { decodedProps } from "@/types";

export function middleware(request: NextRequest) {
  const _mode = process.env.NEXT_PUBLIC_MODE;
  const { pathname, locale } = request.nextUrl;

  if (_mode === "UI") {
    return NextResponse.next();
  }

  // Allow static files & Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  const loginUrl = new URL(`/${locale}/login`, request.url);
  const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
  const forbiddenUrl = new URL(`/${locale}/403`, request.url);

  // Allow access to /403 explicitly
  if (pathname === `/${locale}/403`) {
    return NextResponse.next();
  }

  // Allow access to login page without token
  if (pathname === `/${locale}/login` && !token) {
    return NextResponse.next();
  }

  if (token) {
    try {
      const decoded: decodedProps = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Expired token → redirect to login
      if (decoded.exp < currentTime) {
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("accessToken");
        return response;
      }

      // Sudah login → jangan bisa buka halaman login lagi
      if (pathname === `/${locale}/login`) {
        return NextResponse.redirect(dashboardUrl);
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT decode error:", err);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      return response;
    }
  }

  // No token → redirect to login
  return NextResponse.redirect(loginUrl);
}

// Middleware configuration
export const config = {
  matcher: ["/login/:path*"],
};
