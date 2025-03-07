import { createProcedure } from '../trpc';
import captureErrorsMiddleware from '../middlewares/error.middleware';

export const publicProcedure = createProcedure;

publicProcedure.use(captureErrorsMiddleware);

export default publicProcedure;
