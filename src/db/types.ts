import type { UserTable } from './schemas';
import type { InferSelectModel } from 'drizzle-orm';

export type IUser = InferSelectModel<typeof UserTable>;
