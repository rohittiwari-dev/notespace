import { InferSelectModel } from "drizzle-orm";
import {
	customers,
	files,
	folders,
	prices,
	products,
	subscriptions,
	users,
	workspaces,
} from "./schema";

export type Workspace = InferSelectModel<typeof workspaces>;
export type Folder = InferSelectModel<typeof folders>;
export type File = InferSelectModel<typeof files>;
export type Product = InferSelectModel<typeof products>;
export type User = InferSelectModel<typeof users>;
export type Customer = InferSelectModel<typeof customers>;
export type Price = InferSelectModel<typeof prices>;
export type Subscription = InferSelectModel<typeof subscriptions> & {
	prices: Price;
};
export type ProductWithPrices = InferSelectModel<typeof products> & {
	prices?: Price;
};
