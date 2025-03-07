import { sql } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { UserTable } from '@/db/schemas/user.schema';

// Enum Declaration

export const FileTypeEnum = pgEnum('file_type_enum', [
	'page',
	'mind-map',
	'whiteboard',
	'task-board',
	'pdf',
	'routines',
]);

export const SpaceTable = pgTable('spaces', {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 128 }).notNull(),
	icon: varchar({ length: 128 }),
	owner: text()
		.notNull()
		.references(() => UserTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	tags: varchar({ length: 128 })
		.array()
		.default(sql`ARRAY[]::varchar[]`),
	description: text().notNull(),
	logo: text(),
	in_trash: boolean().default(false),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
});

export const ModuleTable = pgTable('modules', {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 128 }).notNull(),
	icon: varchar({ length: 128 }),
	owner: text()
		.notNull()
		.references(() => UserTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	description: text().notNull(),
	logo: text(),
	in_trash: boolean().default(false),
	thumb_nail: text(),
	tags: varchar({ length: 128 })
		.array()
		.default(sql`ARRAY[]::varchar[]`),
	space: uuid()
		.notNull()
		.references(() => SpaceTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
});

export const FileTable = pgTable('files', {
	id: uuid().defaultRandom().primaryKey(),
	name: varchar({ length: 128 }).notNull(),
	icon: varchar({ length: 128 }),
	in_trash: boolean().default(false),
	position: integer().default(1),
	tags: varchar({ length: 128 })
		.array()
		.default(sql`ARRAY[]::varchar[]`),
	owner: text()
		.references(() => UserTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	type: FileTypeEnum().default('page'),
	reference_id: uuid().notNull(),
	space: uuid()
		.references(() => SpaceTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	module: uuid()
		.references(() => ModuleTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }).default(
		sql`now()`,
	),
});
