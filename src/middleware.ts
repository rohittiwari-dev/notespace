import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const publicRoutes = ['/'];

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	const session = getSessionCookie(req);

	if (publicRoutes.includes(req.url)) {
		return NextResponse.next();
	}

	if (req.nextUrl.pathname.startsWith('/dashboard')) {
		if (!session) {
			return NextResponse.redirect(new URL('/sign-in', req.url));
		}
	}
	if (['/sign-in', '/sign-up'].includes(req.nextUrl.pathname)) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard', req.url));
		}
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/:path*',
};
