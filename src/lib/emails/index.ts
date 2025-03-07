'use server';

import type { CreateEmailOptions } from 'resend';
import { Resend } from 'resend';

import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

type ISendEmail = Omit<CreateEmailOptions, 'from'>;

export const sendEmail = async ({ ...props }: ISendEmail) => {
	const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		text: '',
		...props,
	});

	if (error) {
		return {
			success: false,
			message: error.message,
			error,
		};
	}

	return {
		success: true,
		message: 'Message sent successfully',
		data,
	};
};
