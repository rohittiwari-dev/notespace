// Table Schema Declarations

import { sql } from "drizzle-orm";
import {
	boolean,
	date,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { SpaceTable } from "@/db/schemas/space.schema";

export const GenderEnum = pgEnum("gender_enum", [
	"Male",
	"Female",
	"Transgender",
]);

export const UserTable = pgTable("users", {
	id: text("id").primaryKey(),
	name: varchar("name", { length: 128 }).notNull(),
	email: varchar("email", { length: 128 }).notNull().unique(),
	image: varchar("image", { length: 128 }),
	timezone: varchar("timezone", { length: 128 }),
	billingAddress: jsonb("billing_address"),
	countryCode: varchar("country_code", { length: 128 }),
	phone: varchar("phone", { length: 128 }).unique(),
	dateOfBirth: date("date_of_birth"),
	paymentMethod: jsonb("payment_method"),
	mpin: varchar("mpin", { length: 256 }),
	emailVerified: boolean("email_verified").default(false),
	phoneVerified: boolean("phone_verified").default(false),
	gender: GenderEnum("gender"),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "string",
	}).default(sql`now()`),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).default(sql`now()`),
});

export const CollaboratorTable = pgTable("collaborators", {
	id: uuid("id").defaultRandom().primaryKey(),
	space: uuid("space").references(() => SpaceTable.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
	user: text("user").references(() => UserTable.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}),
	created_at: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).default(sql`now()`),
});
