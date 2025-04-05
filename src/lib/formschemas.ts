import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from './constants';

export const loginFormSchema = z.object({
	email: z.string().describe('Email').email(),
	password: z
		.string()
		.describe('Password')
		.min(6, 'password must be at least 6 character')
		.max(20, 'password must not be more than 20 character'),
});

// Sign up form schemas
export const SignUpFormSchema = z
	.object({
		firstName: z
			.string()
			.describe('First Name')
			.min(3, 'first name is required.'),
		lastName: z
			.string()
			.describe('Last Name')
			.min(3, 'last name is required.'),
		email: z.string().describe('Email').email({ message: 'Invalid Email' }),
		password: z
			.string()
			.describe('Password')
			.min(6, 'Password must be at least 6 character long.'),
		confirmPassword: z
			.string()
			.describe('Confirm Password')
			.min(6, 'Password must be at least 6 character long.'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match.",
		path: ['confirmPassword'],
	});

// Workspace setup form schemas
export const WorkspaceSetupSchema = z.object({
	workspaceName: z.string().min(1, { message: 'Workspace name is required' }),
	workspaceLogo: z
		.custom<FileList>()
		.refine(
			(files) => {
				return (files?.[0]?.size || MAX_FILE_SIZE) <= MAX_FILE_SIZE;
			},
			{
				message: `More than ${MAX_FILE_SIZE} are not allowed`,
			},
		)
		.refine(
			(files) =>
				ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type || 'image/jpeg'),
			{
				message:
					'Only .jpg, .jpeg, .png and .webp formats are supported.',
			},
		)
		.optional(),
	workSpaceIcon: z.string().default('📦').optional(),
});

// Workspace general settings form schemas
export const WorkspaceGeneralSettingsSchema = z.object({
	id: z.string().nullable(),
	name: z
		.string()
		.min(1, { message: 'Workspace name is required' })
		.optional(),
	icon: z.string().default('📦').optional(),
	logo: z.string().optional(),
	tags: z.array(z.string()).optional(),
	in_trash: z.boolean().optional(),
});
