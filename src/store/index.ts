'use client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import WorkspaceSlice, { IWorkspaceStateSlice } from './slices/workspace.slice';
import userSlice, { IUserStateSlice } from './slices/user.slice';
import { ModuleSlice, IModuleStore } from './slices/modules.slice';

type StoreState = IWorkspaceStateSlice & IUserStateSlice & IModuleStore;

export const usePersistedAppStore = create<StoreState>()(
	devtools(
		persist(
			(...a) => ({
				...WorkspaceSlice(...a),
				...userSlice(...a),
				...ModuleSlice(...a),
			}),
			{
				name: 'persisted-notespace-app-storage',
			},
		),
	),
);

const useAppStore = create<StoreState>()(
	devtools((...a) => ({
		...WorkspaceSlice(...a),
		...userSlice(...a),
		...ModuleSlice(...a),
	})),
);

export const resetStore = () => {
	useAppStore.getState().resetUser();
	usePersistedAppStore.getState().resetUser();
	useAppStore.getState().resetWorkspace();
	usePersistedAppStore.getState().resetWorkspace();
	useAppStore.getState().resetModule();
	usePersistedAppStore.getState().resetModule();
};

export default useAppStore;
