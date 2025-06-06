import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { UserTable } from '@/db/schemas/user.schema';
import { createId } from '@orama/cuid2';

export const ConnectedAuthProvidersTable = pgTable('connected_auth_providers', {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => UserTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const UserAuthSessionTable = pgTable('user_auth_sessions', {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => UserTable.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
});

export const UserAuthVerificationTable = pgTable('user_auth_verifications', {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
});
