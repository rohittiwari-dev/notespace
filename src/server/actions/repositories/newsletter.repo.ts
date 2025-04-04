'use server';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { NewsLetterSchema } from '@/db/schemas';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';

export const subscribeNewsletter = async (email: string) => {
	try {
		const existingEmail = await db.query.NewsLetterSchema.findFirst({
			where: eq(NewsLetterSchema.email, email),
		});

		if (!existingEmail) {
			const newEmail = await db
				.insert(NewsLetterSchema)
				.values({ email });

			return SuccessResponse({
				data: { email: newEmail },
				message: 'Email subscribed successfully',
			});
		}

		return SuccessResponse({
			data: { email: existingEmail },
			message: 'Email already subscribed',
		});
	} catch (error) {
		throw ErrorResponse({
			error,
		});
	}
};
