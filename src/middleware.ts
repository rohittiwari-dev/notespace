import { betterFetch } from '@better-fetch/fetch';
import { NextResponse, type NextRequest } from 'next/server';
import { Session } from 'better-auth';

import { SELECTED_SPACE_COOKIE_NAME } from './lib/constants';
import { isCuid2 } from './lib/utils/isCuid';

const publicRoutes = ['/'];
const authRoutes = ['/sign-in', '/sign-up'];
const passwordRoutes = ['/reset-password', '/forgot-password'];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	// Check for public routes
	const pathName = req.nextUrl.pathname;
	const ip =
		req.headers.get('x-real-ip') ||
		req.headers.get('x-forwarded-for') ||
		req.headers.get('cf-ip') ||
		req.headers.get('cf-country') ||
		(req as any).ip ||
		'';

	const headers = new Headers(req.headers);
	headers.set('x-ip', ip || 'unknown');
	headers.set('x-pathname', pathName || 'unknown');

	const response = NextResponse.next({
		headers: headers,
	});

	// Check workspace cookie
	if (req.nextUrl.pathname.startsWith('/space/')) {
		// Extract workspace ID from URL if it's a workspace page
		const segments = req.nextUrl.pathname.split('/');
		if (segments.length >= 3 && segments[1] === 'space' && segments[2]) {
			const workspaceId = segments[2];
			// Set the workspace cookie
			if (isCuid2(workspaceId))
				response.cookies.set({
					name: SELECTED_SPACE_COOKIE_NAME,
					value: workspaceId,
					path: '/',
				});
		}
	}

	if (publicRoutes.includes(pathName)) {
		return response;
	}

	// Check for auth routes core
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
