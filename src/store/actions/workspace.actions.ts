import useStore from '@/store/provider';
import { IWorkSpace } from '@/db/schemas';
import { useCallback } from 'react';

const useWorkspaceActions = () => {
	const { dispatch } = useStore();

	const setSelectedWorkspace = useCallback(
		(workspace: IWorkSpace | string) => {
			dispatch({
				type: 'SELECT_WORKSPACE',
				payload: workspace,
			});
		},
		[dispatch],
	);

	const setWorkspaces = useCallback(
		(workspaces: IWorkSpace[], selectedWorkspaceId?: string) => {
			dispatch({
				type: 'SET_WORKSPACES',
				payload: {
					workspaces: workspaces,
					selectedWorkspaceId: selectedWorkspaceId,
				},
			});
		},
		[dispatch],
	);

	const updateWorkspace = useCallback(
		(id: string, workspace: IWorkSpace) => {
			dispatch({
				type: 'UPDATE_WORKSPACE',
				payload: {
					id: id,
					workspace: workspace,
				},
			});
		},
		[dispatch],
	);

	const deleteWorkspace = useCallback(
		(id: string) => {
			dispatch({
				type: 'DELETE_WORKSPACE',
				payload: id,
			});
		},
		[dispatch],
	);

	return {
		setSelectedWorkspace,
		setWorkspaces,
		updateWorkspace,
		deleteWorkspace,
	};
};

export default useWorkspaceActions;
