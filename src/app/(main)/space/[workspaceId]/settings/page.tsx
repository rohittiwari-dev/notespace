import PageTitle from '@/components/app-ui/page-title';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

function SettingsPage() {
	return (
		<div className="flex flex-col w-full h-full gap-2">
			<PageTitle title="Workspace Settings" />
			<Tabs defaultValue="general" className="container gap-4 mt-4">
				<TabsList className="gap-2 p-1 h-fit">
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
					<TabsTrigger
						value="ai"
						className="cursor-pointer py-1.5 min-w-28"
					>
						AI
					</TabsTrigger>
					<TabsTrigger
						value="danger-zone"
						className="cursor-pointer py-1.5 min-w-28"
					>
						Danger Zone
					</TabsTrigger>
				</TabsList>
				<TabsContent value="general" className="px-4">
					General
				</TabsContent>
				<TabsContent value="collaborators" className="px-4">
					collaborators
				</TabsContent>
				<TabsContent value="integrations" className="px-4">
					Integrations
				</TabsContent>
				<TabsContent value="danger-zone" className="px-4">
					Danger Zone
				</TabsContent>
				<TabsContent value="ai" className="px-4">
					Ai Integration
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default SettingsPage;
