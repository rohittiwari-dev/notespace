import { z } from "zod";

// Sign up form schema
export const SignUpFormSchema = z
	.object({
		fullName: z.string().describe("Full Name").min(3, "name is required."),
		email: z.string().describe("Email").email({ message: "Invalid Email" }),
		password: z
			.string()
			.describe("Password")
			.min(6, "Password must be at least 6 character long."),
		confirmPassword: z
			.string()
			.describe("Confirm Password")
			.min(6, "Password must be at least 6 character long."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match.",
		path: ["confirmPassword"],
	});

// login form schema
export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(20),
});
