import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="bg-background relative z-0 h-full w-full overflow-hidden">
			<div className="bg-accent-pink/70 absolute -top-30 right-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-orange/70 absolute -top-30 right-80 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-purple/70 absolute -bottom-30 left-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-background/40 z-50 h-full w-full overflow-y-auto backdrop-blur-2xl">
				{children}
			</div>
		</main>
	);
};

export default DashboardLayout;
