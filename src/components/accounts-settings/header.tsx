import React from 'react';
import { User } from 'better-auth';
import UserButton from '../app-ui/user-button';

function AccountAndSettingsHeader({ user }: { user?: User }) {
	return (
		<div className="flex  items-center justify-between">
			<h1 className="text-2xl font-bold">Account and Settings</h1>
			<div className="flex-1" />
			{user && (
				<UserButton
					variant="header"
					name={user.name ?? ''}
					email={user.email ?? ''}
					avatar={user.image ?? ''}
				/>
			)}
		</div>
	);
}

export default AccountAndSettingsHeader;
