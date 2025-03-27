import React from 'react';

function DashboardWorkspacePage({
	params,
}: {
	params: { workspaceId: string };
}) {
	return <div>DashboardWorkspacePage : {params.workspaceId}</div>;
}

export default DashboardWorkspacePage;
