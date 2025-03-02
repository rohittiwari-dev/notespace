import { createRouter } from "../trpc";
import protectedProcedure from "../procedures/protectedProcedure";

const helloRouter = createRouter({
	getGreetings: protectedProcedure.query(() => {
		return {
			greeting: `hello World`,
		};
	}),
});

export default helloRouter;
