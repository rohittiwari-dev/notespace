import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex overflow-hidden">
			<Sidebar />
			<div className="flex-1 overflow-y-auto">{children}</div>
		</main>
	);
};

export default DashboardLayout;
