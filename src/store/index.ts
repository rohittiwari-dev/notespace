'use client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import WorkspaceSlice, { WorkspaceStateSlice } from './slices/workspace.slice';
import userSlice, { UserStateSlice } from './slices/user.slice';

type StoreState = WorkspaceStateSlice & UserStateSlice;

export const usePersistedAppStore = create<StoreState>()(
	devtools(
		persist(
			(...a) => ({
				...WorkspaceSlice(...a),
				...userSlice(...a),
			}),
			{
				name: 'persisted-notespace-app-storage',
			},
		),
	),
);

const useAppStore = create<StoreState>()(
	devtools((...args) => ({
		...WorkspaceSlice(...args),
		...userSlice(...args),
	})),
);

export const resetStore = () => {
	useAppStore.getState().resetUser();
	usePersistedAppStore.getState().resetUser();
	useAppStore.getState().resetWorkspace();
	usePersistedAppStore.getState().resetWorkspace();
};

export default useAppStore;
