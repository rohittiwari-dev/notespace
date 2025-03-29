import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { SELECTED_SPACE_COOKIE_NAME } from './lib/constants';

const publicRoutes = ['/'];

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	const session = getSessionCookie(req);
	const response = NextResponse.next();

	if (publicRoutes.includes(req.url)) {
		return response;
	}

	// Handle workspace switching by updating cookies in middleware
	if (req.nextUrl.pathname.startsWith('/space/')) {
		// Extract workspace ID from URL if it's a workspace page
		const segments = req.nextUrl.pathname.split('/');
		if (segments.length >= 3 && segments[1] === 'space' && segments[2]) {
			const workspaceId = segments[2];

			// Set the workspace cookie
			response.cookies.set({
				name: SELECTED_SPACE_COOKIE_NAME,
				value: workspaceId,
				path: '/',
				maxAge: 31536000, // 1 year
			});
		}
	}

	if (req.nextUrl.pathname.startsWith('/space')) {
		if (!session) {
			return NextResponse.redirect(new URL('/sign-in', req.url));
		}
	}
	if (['/sign-in', '/sign-up'].includes(req.nextUrl.pathname)) {
		if (session) {
			return NextResponse.redirect(new URL('/space', req.url));
		}
	}
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/space/:path*',
		'/sign-in',
		'/sign-up',
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
