import React from "react";

const Page = ({
	params: { workspaceId },
}: {
	params: { workspaceId: string };
}) => {
	return <section>{workspaceId}</section>;
};

export default Page;
