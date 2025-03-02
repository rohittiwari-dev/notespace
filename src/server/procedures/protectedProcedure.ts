import withAuth from "../middlewares/withAuth.middleware";
import { createProcedure } from "../trpc";
import captureErrorsMiddleware from "../middlewares/error.middleware";

export const authProcedure = createProcedure.use(withAuth);

authProcedure.use(captureErrorsMiddleware);

export default authProcedure;
