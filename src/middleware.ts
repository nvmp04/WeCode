// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/dashboard', '/learn'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const isProtected = PROTECTED.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/learn/:path*'],
};