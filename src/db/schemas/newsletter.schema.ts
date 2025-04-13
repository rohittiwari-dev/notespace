import { createId } from '@orama/cuid2';
import { pgTable, timestamp, varchar, text } from 'drizzle-orm/pg-core';

export const NewsLetterSchema = pgTable('newsletter', {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	email: varchar({ length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
