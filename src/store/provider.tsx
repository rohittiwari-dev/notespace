'use client';
import { useClientCookies } from '@/hooks/useClientCookies';
import { authClientApi } from '@/lib/auth/client';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';
import { api } from '@/lib/trpc/client';
import {
	TWorkspaceReducerAction,
	workspaceReducer,
	workspaceReducerInitialState,
} from '@/store/reducers/workspace.reducer';
import { Session, User } from 'better-auth';

import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';

// RootState
export type RootState = {
	session: Session | null;
	user: User | null;
	workspace: typeof workspaceReducerInitialState;
};

// Root Actions
export type RootAction = TWorkspaceReducerAction;

// Store initial State
const initialState: RootState = {
	workspace: workspaceReducerInitialState,
	session: null,
	user: null,
};

// StoreContext
export type TStoreContext = {
	state: RootState;
	dispatch: Dispatch<RootAction>;
};

const StoreContext = createContext<TStoreContext>({
	state: initialState,
	dispatch: () => null,
});

StoreContext.displayName = 'NotespaceStoreContext';

const rootReducer = (state: RootState, action: RootAction): RootState => ({
	...state,
	workspace: workspaceReducer(
		state.workspace,
		action as TWorkspaceReducerAction,
	),
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const cookieStore = useClientCookies();
	const [state, dispatch] = useReducer(rootReducer, initialState);
	const { data: session } = authClientApi.useSession();
	const { data: workspaces } = api.workspace.getWorkspaces.useQuery(
		{
			userId: session?.user?.id || '',
		},
		{ enabled: !!session?.user?.id },
	);
	const currentWorkspaceId =
		cookieStore.getCookie(SELECTED_SPACE_COOKIE_NAME) ||
		workspaces?.[0]?.id ||
		'';

	useEffect(() => {
		if (session?.user && workspaces) {
			dispatch({
				type: 'SET_WORKSPACES',
				payload: {
					workspaces: workspaces || [],
					selectedWorkspaceId: currentWorkspaceId?.toString() || '',
				},
			});
		}
	}, [currentWorkspaceId, session?.user, workspaces]);

	return (
		<StoreContext.Provider
			value={{
				state: {
					...state,
					session: session?.session || null,
					user: session?.user || null,
				},
				dispatch,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

const useStore = (): TStoreContext => {
	return useContext(StoreContext);
};

export default useStore;
