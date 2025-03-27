import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {
	ConnectedAuthProvidersTable,
	FileTable,
	ModuleTable,
	UserTable,
	CollaboratorTable,
	WorkspaceTable,
	UserAuthSessionTable,
	UserAuthVerificationTable,
	NewsLetterSchema,
} from './schemas';

export const IWorkspaceInsertSchema = createInsertSchema(WorkspaceTable);
export const IWorkspaceSelectSchema = createSelectSchema(WorkspaceTable);
export const IWorkspaceUpdateSchema =
	createInsertSchema(WorkspaceTable).partial();

export const IUserInsertSchema = createInsertSchema(UserTable);
export const IUserSelectSchema = createSelectSchema(UserTable);
export const IUserUpdateSchema = createInsertSchema(UserTable).partial();

export const IModuleInsertSchema = createInsertSchema(ModuleTable);
export const IModuleSelectSchema = createSelectSchema(ModuleTable);
export const IModuleUpdateSchema = createInsertSchema(ModuleTable).partial();

export const IFileInsertSchema = createInsertSchema(FileTable);
export const IFileSelectSchema = createSelectSchema(FileTable);
export const IFileUpdateSchema = createInsertSchema(FileTable).partial();

export const IConnectedAuthProvidersInsertSchema = createInsertSchema(
	ConnectedAuthProvidersTable,
);
export const IConnectedAuthProvidersSelectSchema = createSelectSchema(
	ConnectedAuthProvidersTable,
);

export const IConnectedAuthProvidersUpdateSchema = createInsertSchema(
	ConnectedAuthProvidersTable,
).partial();

export const ICollaboratorInsertSchema = createInsertSchema(CollaboratorTable);
export const ICollaboratorSelectSchema = createSelectSchema(CollaboratorTable);
export const ICollaboratorUpdateSchema =
	createInsertSchema(CollaboratorTable).partial();

export const IUserAuthSessionInsertSchema =
	createInsertSchema(UserAuthSessionTable);
export const IUserAuthSessionSelectSchema =
	createSelectSchema(UserAuthSessionTable);
export const IUserAuthSessionUpdateSchema =
	createInsertSchema(UserAuthSessionTable).partial();

export const IUserAuthVerificationInsertSchema = createInsertSchema(
	UserAuthVerificationTable,
);
export const IUserAuthVerificationSelectSchema = createSelectSchema(
	UserAuthVerificationTable,
);
export const IUserAuthVerificationUpdateSchema = createInsertSchema(
	UserAuthVerificationTable,
).partial();

export const INewsLetterInsertSchema = createInsertSchema(NewsLetterSchema);
export const INewsLetterSelectSchema = createSelectSchema(NewsLetterSchema);
export const INewsLetterUpdateSchema =
	createInsertSchema(NewsLetterSchema).partial();
