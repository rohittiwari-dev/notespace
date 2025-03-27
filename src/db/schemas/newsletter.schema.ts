import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const NewsLetterSchema = pgTable('newsletter', {
	id: uuid().defaultRandom().primaryKey(),
	email: varchar({ length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
