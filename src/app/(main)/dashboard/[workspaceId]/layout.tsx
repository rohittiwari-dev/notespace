import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({
	children,
	params,
}: {
	params: any;
	children: React.ReactNode;
}) => {
	return (
		<main className="flex h-screen w-screen overflow-hidden">
			<Sidebar params={params} />
			<div className="relative w-full flex-1 overflow-y-auto border-l-[1px] dark:border-neutral-800/70">
				{children}
			</div>
		</main>
	);
};

export default DashboardLayout;
