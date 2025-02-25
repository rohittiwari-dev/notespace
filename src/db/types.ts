import { UserTable } from "./schemas";
import { InferSelectModel } from "drizzle-orm";

export type IUser = InferSelectModel<typeof UserTable>;
