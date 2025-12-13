import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🔒 Password Protection Middleware
 * Protects all routes with basic authentication
 */

export function middleware(request: NextRequest) {
  // Skip password check for API routes (they have their own auth)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for password in cookie
  const password = request.cookies.get('p2ba-auth');
  const correctPassword = process.env.P2BA_PASSWORD || 'chiaras-world-2025';

  // If password is correct, allow access
  if (password?.value === correctPassword) {
    return NextResponse.next();
  }

  // Check if this is a login attempt
  const loginAttempt = request.nextUrl.searchParams.get('password');
  if (loginAttempt === correctPassword) {
    const response = NextResponse.next();
    response.cookies.set('p2ba-auth', correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return response;
  }

  // Show login page
  if (request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

