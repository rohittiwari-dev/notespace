import PageTitle from '@/components/app-ui/page-title';
import GeneralSettings from '@/components/workspace/settings/general-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import CollaboratorsSettings from '@/components/workspace/settings/collaborator';

function SettingsPage() {
	return (
		<div className="flex flex-col w-full h-full gap-2">
			<PageTitle title="Workspace Settings" />
			<Tabs defaultValue="general" className="gap-4 mt-4">
				<TabsList className="gap-2 p-1 shadow h-fit">
					<TabsTrigger
						value="general"
						className="cursor-pointer  py-1.5 min-w-28"
					>
						General
					</TabsTrigger>
					<TabsTrigger
						value="collaborators"
						className="cursor-pointer py-1.5 min-w-28"
					>
						Collaborators
					</TabsTrigger>
					<TabsTrigger
						value="integrations"
						className="cursor-pointer py-1.5 min-w-28"
					>
						Integrations
					</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<GeneralSettings />
				</TabsContent>
				<TabsContent value="collaborators">
					<CollaboratorsSettings />
				</TabsContent>
				<TabsContent value="integrations">Integrations</TabsContent>
			</Tabs>
		</div>
	);
}

export default SettingsPage;
