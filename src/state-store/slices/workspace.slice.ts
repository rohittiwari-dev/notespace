import { File, Folder, Workspace } from "@/lib/supabase/superbase.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WorkspaceFolderStateType = Folder & {
	files: File[];
};

export type WorkspaceStateWithFolderType = Workspace & {
	folders: WorkspaceFolderStateType[];
};

export type WorkspaceStateType = {
	selectedWorkspace: WorkspaceStateWithFolderType | null;
	workspaces: WorkspaceStateWithFolderType[];
};

const initialState: WorkspaceStateType = {
	selectedWorkspace: null,
	workspaces: [],
};

const workspaceSlice = createSlice({
	name: "WorkspaceSlice",
	initialState,
	reducers: {
		setWorkspaces: (
			state,
			action: PayloadAction<WorkspaceStateWithFolderType[]>,
		) => {
			state.workspaces = action.payload;
		},
		setSelectedWorkspace: (
			state,
			action: PayloadAction<WorkspaceStateWithFolderType>,
		) => {
			state.selectedWorkspace = action.payload;
		},
	},
});

export default workspaceSlice;
