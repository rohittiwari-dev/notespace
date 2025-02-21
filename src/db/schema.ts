import {
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
	id: uuid().defaultRandom().primaryKey(),
	firstname: varchar({ length: 128 }).notNull(),
	lastname: varchar({ length: 128 }).notNull(),
	email: varchar({ length: 128 }).notNull().unique(),
	updated_at: timestamp(),
	created_at: timestamp({ withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
});

export const SpaceTable = pgTable("spaces", {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 128 }).notNull(),
	icon: varchar({ length: 128 }),
	owner: uuid()
		.notNull()
		.references(() => UserTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	description: text().notNull(),
	logo: text(),
	in_trash: boolean().default(false),
	updated_at: timestamp({ withTimezone: true, mode: "string" }),
	created_at: timestamp({ withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
});

export const ModuleTable = pgTable("modules", {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 128 }).notNull(),
	icon: varchar({ length: 128 }),
	owner: uuid()
		.notNull()
		.references(() => UserTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	description: text().notNull(),
	logo: text(),
	in_trash: boolean().default(false),
	thumb_nail: text(),
	space: uuid()
		.notNull()
		.references(() => SpaceTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	updated_at: timestamp({ withTimezone: true, mode: "string" }),
	created_at: timestamp({ withTimezone: true, mode: "string" }),
});
