import React, { FC, ReactNode } from "react";

interface DashboardLayoutProps {
	children: ReactNode;
}

const HomeLayout: FC<DashboardLayoutProps> = ({ children }) => {
	return (
		<main className="h-full w-full overflow-hidden overflow-y-auto">
			{children}
		</main>
	);
};

export default HomeLayout;
