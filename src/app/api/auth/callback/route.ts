import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
	// Parse the URL to extract the 'code' parameter from the query string
	const requestUrl = new URL(req.url);
	const code = requestUrl.searchParams.get("code");
	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}
	return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
