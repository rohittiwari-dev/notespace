import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { FileTable, ModuleTable, WorkspaceTable } from './workspace.schema';
import {
	ConnectedAuthProvidersTable,
	UserAuthSessionTable,
	UserAuthVerificationTable,
} from './auth.schema';
import { NewsLetterSchema } from './newsletter.schema';
import { UserTable } from './user.schema';

export type IWorkSpace = InferSelectModel<typeof WorkspaceTable>;
export type IWorkSpaceInsert = InferInsertModel<typeof WorkspaceTable>;

export type IUser = InferSelectModel<typeof UserTable>;
export type IUserInsert = InferInsertModel<typeof UserTable>;

export type IConnectedAuthProviders = InferSelectModel<
	typeof ConnectedAuthProvidersTable
>;
export type IConnectedAuthProvidersInsert = InferInsertModel<
	typeof ConnectedAuthProvidersTable
>;

export type IUserAuthSession = InferSelectModel<typeof UserAuthSessionTable>;
export type IUserAuthSessionInsert = InferInsertModel<
	typeof UserAuthSessionTable
>;

export type IUserAuthVerification = InferSelectModel<
	typeof UserAuthVerificationTable
>;
export type IUserAuthVerificationInsert = InferInsertModel<
	typeof UserAuthVerificationTable
>;

export type IModule = InferSelectModel<typeof ModuleTable> & {
	files?: IFile[];
};
export type IModuleInsert = InferInsertModel<typeof ModuleTable>;

export type IFile = InferSelectModel<typeof FileTable>;
export type IFileInsert = InferInsertModel<typeof FileTable>;

export type INewsLetter = InferSelectModel<typeof NewsLetterSchema>;
export type INewsLetterInsert = InferInsertModel<typeof NewsLetterSchema>;
