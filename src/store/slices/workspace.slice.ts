import { StateCreator } from 'zustand';
import { IWorkSpace } from '@/db/schemas';
import _ from 'lodash';

export type TInitialWorkspaceState = {
	workspaces: IWorkSpace[];
	workspace: IWorkSpace | null;
};

export interface WorkspaceStateSlice extends TInitialWorkspaceState {
	setWorkspace: (workspace: string | IWorkSpace) => void;
	updateWorkspace: (id: string, workspace: Partial<IWorkSpace>) => void;
	deleteWorkspace: (id: string, type?: 'soft' | 'hard') => void;
	setWorkspaces: (
		workspaces: IWorkSpace[],
		workspace?: string | IWorkSpace,
	) => void;
	resetWorkspace: () => void;
}

export const initialWorkspaceState: TInitialWorkspaceState = {
	workspaces: [],
	workspace: null,
};

const WorkspaceSlice: StateCreator<WorkspaceStateSlice> = (set) => ({
	...initialWorkspaceState,
	setWorkspace: _.debounce(
		(workspace) =>
			set((state) => ({
				workspace:
					typeof workspace === 'string'
						? state.workspaces.find((val) => val.id === workspace)
						: workspace,
			})),
		0,
	),
	// set workspace to null if it is not found in the workspaces array
	updateWorkspace: _.debounce(
		(id, workspace) =>
			set((state) => ({
				workspaces: state.workspaces.map((ws) =>
					ws.id === id ? { ...ws, ...workspace } : ws,
				),
				workspace:
					state.workspace?.id === id
						? { ...state.workspace, ...workspace }
						: state.workspace,
			})),
		0,
	),
	deleteWorkspace: _.debounce(
		(id, type = 'soft') =>
			set((state) => {
				if (type === 'soft') {
					return {
						workspaces: state.workspaces.map((ws) => {
							if (ws.id === id) ws.in_trash = true;
							return ws;
						}),
						workspace:
							state.workspace?.id === id
								? ({
										...state.workspace,
										in_trash: true,
									} as IWorkSpace)
								: state.workspace,
					};
				} else {
					return {
						workspaces: state.workspaces.filter(
							(ws) => ws.id !== id,
						),
						workspace:
							state.workspace?.id === id ? null : state.workspace,
					};
				}
			}),
		0,
	),
	setWorkspaces: _.debounce(
		(workspaces, workspace) =>
			set({
				workspaces,
				workspace:
					typeof workspace === 'string'
						? workspaces.find((val: any) => val.id === workspace) ||
							null
						: workspace || null,
			}),
		0,
	),
	resetWorkspace: _.debounce(() => {
		set(initialWorkspaceState);
	}, 0),
});

export default WorkspaceSlice;
