import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session';
// Proxy (dulu bernama middleware) berjalan sebelum route dirender.
// Tanpa session -> lempar ke /login. Sudah login tapi buka /login -> ke /dashboard.
export function proxy(request: NextRequest) {
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
    const { pathname } = request.nextUrl;
    const isAuthRoute = pathname === '/login';
    const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/expenses');
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = hasSession ? '/dashboard' : '/login';
        return NextResponse.redirect(url);
    }
    if (isProtected && !hasSession) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    if (isAuthRoute && hasSession) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/expenses/:path*', '/login'],
};