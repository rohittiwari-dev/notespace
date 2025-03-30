import { createRouter } from '../trpc';
import publicProcedure from '../procedures/publicProcedure';
import { z } from 'zod';
import validateEmail from '@/utils/email-validator';
import { subscribeNewsletter } from '@/server/actions/repositories/newsletter.repo';
import { SuccessResponse } from '@/db/handlers';

const newsLetterRouter = createRouter({
	subscribeNewsLetter: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
			}),
		)
		.mutation(async ({ input }) => {
			const email = validateEmail(input.email);
			await subscribeNewsletter(email);
			return SuccessResponse({
				data: { email },
				message: 'Newsletter subscribed successfully',
			});
		}),
});

export default newsLetterRouter;
