import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

if (!env.DATABASE_URL) console.log('🔴 Cannot Find Database Url');

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schemas',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	...(env.DATABASE_URL?.includes('neon.tech') && {
		websocket: true,
	}),
});
