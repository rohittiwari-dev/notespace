import { betterFetch } from '@better-fetch/fetch';
import { NextResponse, type NextRequest } from 'next/server';

import { Session } from 'better-auth';
import cuid2 from '@paralleldrive/cuid2';
import { SELECTED_SPACE_COOKIE_NAME } from './lib/constants';

const publicRoutes = ['/'];
const authRoutes = ['/sign-in', '/sign-up'];
const passwordRoutes = ['/reset-password', '/forgot-password'];

// This function can be marked `async` if using `await` inside
export default async function cm8vuq2l6000008l54ik26amzAuthMiddleware(
	req: NextRequest,
) {
	// Check for public routes
	const pathName = req.nextUrl.pathname;
	const response = NextResponse.next();

	// Check workspace cookie
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

	if (publicRoutes.includes(pathName)) {
		return response;
	}

	// Check for auth routes
	const isAuthRoute = authRoutes.includes(pathName);
	const isPasswordRoute = passwordRoutes.includes(pathName);

	// Get the session
	const { data: session } = await betterFetch<Session>(
		'/api/auth/get-session',
		{
			baseURL: process.env['BETTER_AUTH_URL'],
			headers: {
				//get the cookie from the request
				cookie: req.headers.get('cookie') || '',
			},
		},
	);

	// If the user is not authenticated, redirect to the sign-in page
	if (!session) {
		if (isAuthRoute || isPasswordRoute) {
			return response;
		}
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}

	// If the user is authenticated, redirect to the space page
	if (isAuthRoute || isPasswordRoute) {
		return NextResponse.redirect(new URL('/space', req.url));
	}

	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/space/:path*',
		'/sign-in',
		'/sign-up',
		'/((?!api|_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
};
