import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

if (!env.DATABASE_URL) console.log('🔴 Cannot Find Database Url');

export default defineConfig({
	out: './drizzle',
	schema: './src/db.ts/schemas',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
