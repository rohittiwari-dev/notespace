import 'server-only';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schemas';
import { env } from '@/env';
import * as validators from './validators';

if (!env.DATABASE_URL) {
	console.log('🔴 no database URL');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, schema: schema });

export { schema, validators };
export default db;
