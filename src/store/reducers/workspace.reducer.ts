import { IWorkSpace } from '@/db/schemas';

export type TWorkspaceReducerState = {
	selectedWorkspace: IWorkSpace | null;
	loading: boolean;
	error: string | null;
	workspaces: IWorkSpace[];
};

export const workspaceReducerInitialState: TWorkspaceReducerState = {
	selectedWorkspace: null,
	loading: false,
	error: null,
	workspaces: [],
};

export type TWorkspaceReducerAction =
	| {
			type: 'SET_WORKSPACES';
			payload: { workspaces: IWorkSpace[]; selectedWorkspaceId?: string };
	  }
	| { type: 'SELECT_WORKSPACE'; payload: IWorkSpace | string }
	| {
			type: 'UPDATE_WORKSPACE';
			payload: { id: string; workspace: IWorkSpace };
	  }
	| { type: 'DELETE_WORKSPACE'; payload: string };

export const workspaceReducer = (
	state: TWorkspaceReducerState = workspaceReducerInitialState,
	action: TWorkspaceReducerAction,
): TWorkspaceReducerState => {
	switch (action.type) {
		case 'SET_WORKSPACES':
			if (action.payload.selectedWorkspaceId) {
				state.selectedWorkspace =
					action.payload.workspaces.find(
						(value) =>
							value.id === action.payload.selectedWorkspaceId,
					) || null;
			}
			state.workspaces = action.payload.workspaces;
			console.log('workspaces', action.payload.workspaces);
			return state;
		case 'SELECT_WORKSPACE': {
			if (typeof action.payload === 'string') {
				state.selectedWorkspace =
					state.workspaces.find(
						(value) => value.id === action.payload,
					) || state.workspaces[0];
				return state;
			}
			state.selectedWorkspace = action.payload;
			return state;
		}
		case 'DELETE_WORKSPACE': {
			if (state.selectedWorkspace?.id === action.payload) {
				state.selectedWorkspace = state.workspaces?.length
					? state.workspaces[0]
					: null;
			}
			state.workspaces = state.workspaces?.filter(
				(w) => w.id !== action.payload,
			);
			return state;
		}
		case 'UPDATE_WORKSPACE': {
			const workspaces = state.workspaces?.map((value) => {
				if (action.payload?.id === value?.id) {
					return {
						...value,
						...(action?.payload?.workspace || {}),
					};
				}
				return value;
			});
			const activeWorkspace =
				state.selectedWorkspace?.id !== action.payload.id
					? state.selectedWorkspace
					: {
							...((state.selectedWorkspace || {}) as IWorkSpace),
							...action.payload.workspace,
						};

			state.selectedWorkspace = activeWorkspace;
			state.workspaces = workspaces || [];
			return state;
		}
		default:
			return state;
	}
};
