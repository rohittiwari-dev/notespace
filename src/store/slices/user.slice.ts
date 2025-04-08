import { Session, User } from 'better-auth';
import _ from 'lodash';
import { StateCreator } from 'zustand';

export type TInitialUserState = {
	user: User | null;
	session: Session | null;
};

export interface UserStateSlice extends TInitialUserState {
	setUserAndSession: ({
		user,
		session,
	}: {
		user: User;
		session: Session;
	}) => void;
	resetUser: () => void;
}

const initialUserState: TInitialUserState = {
	user: null,
	session: null,
};

const userSlice: StateCreator<UserStateSlice> = (set) => ({
	...initialUserState,
	setUserAndSession: _.debounce(
		({ user, session }) => set({ user, session }),
		1,
	),
	resetUser: () => set(initialUserState),
});

export default userSlice;
