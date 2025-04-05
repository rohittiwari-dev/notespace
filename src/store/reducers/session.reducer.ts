import { Session, User } from 'better-auth';

export type TSessionInitialState = {
	user: User;
	session: Session;
};

export const sessionInitialState = {
	user: null,
	session: null,
};

export const sessionReducer = () => {};
