"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {
	SignUpFormSchema,
	loginFormSchema,
} from "@/lib/form-schema/authSchema";
import { cookies } from "next/headers";
import { z } from "zod";

export async function loginServerActions({
	email,
	password,
}: z.infer<typeof loginFormSchema>) {
	const supabase = createRouteHandlerClient({ cookies });
	const { error, data } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { success: false, message: error.message, data };
	}

	return { success: true, data, message: "successfully logged in" };
}

export async function signupServerAction({
	email,
	password,
	fullName,
}: z.infer<typeof SignUpFormSchema>) {
	const supabase = createRouteHandlerClient({ cookies });

	// Check if the user already exists
	const { data, error: userIsExistsError } = await supabase
		.from("users")
		.select("*")
		.eq("email", email);

	if (data?.length || userIsExistsError) {
		return { success: false, message: "User already exists", data };
	}

	// Attempt to sign up the user
	const { data: userSession, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
		},
	});

	// Handle errors including rate limit exceeded error
	if (error) {
		const customError = { ...error };
		return {
			success: false,
			message:
				"Something Went Wrong : " + error?.message ||
				customError.code ||
				"",
			data: userSession,
		};
	}

	return {
		success: true,
		data: userSession,
		message:
			"Successfully signed up. Please check your email to confirm your account.",
	};
}
