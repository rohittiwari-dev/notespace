import { createCallerFactory } from "./trpc";
import routers from "@/server/routers";

export const appRouter = routers;

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
