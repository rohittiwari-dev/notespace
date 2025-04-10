import { sql } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core';
import { UserTable } from '@/db/schemas/user.schema';
import { createId } from '@paralleldrive/cuid2';

// Enum Declaration

export const FileTypeEnum = pgEnum('file_type_enum', [
	'page',
	'mind-map',
	'whiteboard',
	'task-board',
	'pdf',
	'routines',
]);

export const WorkspaceTable = pgTable(
	'workspaces',
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId()),
		name: varchar({ length: 128 }).notNull(),
		icon: varchar({ length: 128 }).notNull(),
		owner: text()
			.notNull()
			.references(() => UserTable.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		tags: varchar({ length: 128 })
			.array()
			.default(sql`ARRAY[]::varchar[]`),
		logo: text(),
		logo_public_id: text(),
		in_trash: boolean().default(false),
		updated_at: timestamp({ withTimezone: true, mode: 'string' }).default(
			sql`now()`,
		),
		created_at: timestamp({ withTimezone: true, mode: 'string' }).default(
			sql`now()`,
		),
	},
	(t) => [
		{
			unique_workspace_name_index: uniqueIndex(
				'user_unique_workspace',
			).on(t.name, t.owner),
		},
	],
);

export const ModuleTable = pgTable('modules', {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
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
	logo_public_id: text(),
	in_trash: boolean().default(false),
	tags: varchar({ length: 128 })
		.array()
		.default(sql`ARRAY[]::varchar[]`),
	workspace: text()
		.notNull()
		.references(() => WorkspaceTable.id, {
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
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
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
	reference_id: text().notNull(),
	workspace: text()
		.references(() => WorkspaceTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	module: text()
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
