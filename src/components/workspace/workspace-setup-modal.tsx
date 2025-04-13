import React from 'react';
import '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SetupWorkspace from './setup-workspace';

type WorkspaceSetupModalProps = {
	open: boolean;
	onClose: () => void;
};

function WorkspaceSetupModal({ open, onClose }: WorkspaceSetupModalProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="!p-0  dark:!bg-transparent flex max-h-[90vh] overflow-y-auto  [&>button]:cursor-pointer">
				<DialogTitle className="sr-only">Setup Workspace</DialogTitle>
				<SetupWorkspace
					cardClassName="max-w-full"
					open={open}
					isModal={open}
					handleOnSuccess={() => {
						onClose();
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default WorkspaceSetupModal;
