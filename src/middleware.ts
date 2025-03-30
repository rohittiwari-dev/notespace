import { betterFetch } from '@better-fetch/fetch';
import { NextResponse, type NextRequest } from 'next/server';
import { SELECTED_SPACE_COOKIE_NAME } from './lib/constants';
import { Session } from 'better-auth';
import cuid2 from '@paralleldrive/cuid2';

const publicRoutes = ['/'];
const authRoutes = ['/sign-in', '/sign-up'];
const passwordRoutes = ['/reset-password', '/forgot-password'];

// This function can be marked `async` if using `await` inside
export default async function cm8vuq2l6000008l54ik26amzAuthMiddleware(
	req: NextRequest,
) {
	const response = NextResponse.next();
	const pathName = req.nextUrl.pathname;
	const isAuthRoute = authRoutes.includes(pathName);
	const isPasswordRoute = passwordRoutes.includes(pathName);

	if (publicRoutes.includes(req.url)) {
		return response;
	}

	const { data: session } = await betterFetch<Session>(
		'/api/auth/get-session',
		{
			baseURL: req.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: req.headers.get('cookie') || '',
			},
		},
	);

	if (!session) {
		if (isAuthRoute || isPasswordRoute) {
			return response;
		}
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}

	if (isAuthRoute || isPasswordRoute) {
		return NextResponse.redirect(new URL('/space', req.url));
	}

	// Handle workspace switching by updating cookies in middleware
	if (req.nextUrl.pathname.startsWith('/space/')) {
		// Extract workspace ID from URL if it's a workspace page
		const segments = req.nextUrl.pathname.split('/');
		if (segments.length >= 3 && segments[1] === 'space' && segments[2]) {
			const workspaceId = segments[2];
			// Set the workspace cookie
			if (cuid2.isCuid(workspaceId))
				response.cookies.set({
					name: SELECTED_SPACE_COOKIE_NAME,
					value: workspaceId,
					path: '/',
					maxAge: 31536000,
				});
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
