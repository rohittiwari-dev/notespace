import useStore, { StoreProvider } from './provider';
import useWorkspaceActions from '@/store/actions/workspace.actions';

export { StoreProvider };

const useAppStore = () => {
	const { state, dispatch } = useStore();
	const {
		setWorkspaces,
		setSelectedWorkspace,
		updateWorkspace,
		deleteWorkspace,
	} = useWorkspaceActions();

	// All State Setting Function Return
	return {
		state,
		dispatch,
		setWorkspaces,
		setSelectedWorkspace,
		updateWorkspace,
		deleteWorkspace,
	};
};

export default useAppStore;
