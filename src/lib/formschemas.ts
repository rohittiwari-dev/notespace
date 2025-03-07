import * as Zod from 'zod';

export const loginFormSchema = Zod.object({
	email: Zod.string().describe('Email').email(),
	password: Zod.string()
		.describe('Password')
		.min(6, 'password must be at least 6 character')
		.max(20, 'password must not be more than 20 character'),
});

// Sign up form schemas
export const SignUpFormSchema = Zod.object({
	firstName: Zod.string()
		.describe('First Name')
		.min(3, 'first name is required.'),
	lastName: Zod.string()
		.describe('Last Name')
		.min(3, 'last name is required.'),
	email: Zod.string().describe('Email').email({ message: 'Invalid Email' }),
	password: Zod.string()
		.describe('Password')
		.min(6, 'Password must be at least 6 character long.'),
	confirmPassword: Zod.string()
		.describe('Confirm Password')
		.min(6, 'Password must be at least 6 character long.'),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Password don't match.",
	path: ['confirmPassword'],
});
