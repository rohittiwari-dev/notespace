import React from "react";

const Page = async (props: { params: Promise<{ workspaceId: string }> }) => {
	const params = await props.params;
	const { workspaceId } = params;
	return <section>{workspaceId}</section>;
};

export default Page;
