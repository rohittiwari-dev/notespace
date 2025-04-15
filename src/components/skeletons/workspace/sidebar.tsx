export const SwitchItemSkeleton = () => {
	return (
		<div className="h-12 flex items-center space-x-3 will-change-auto animate-pulse">
			{/* Optimized square skeleton with reduced animation complexity */}
			<div className="size-8 bg-sidebar-accent/80 rounded-sm" />
			{/* Text skeleton with simplified animation */}
			<div className="flex-1 flex flex-col justify-center gap-1 w-full">
				<span className="w-32 h-3 bg-sidebar-accent/80 rounded-sm " />
				<span className="w-28 h-2.5 bg-sidebar-accent/70 rounded-sm opacity-60" />
			</div>
		</div>
	);
};

export const UserButtonSidebarSkeleton = () => {
	return (
		<div className="h-12 px-2 flex items-center space-x-3 will-change-auto">
			{/* Optimized square skeleton with reduced animation complexity */}
			<div className="size-9 bg-sidebar-accent/50 rounded-sm" />
			{/* Text skeleton with simplified animation */}
			<div className="flex-1 flex flex-col justify-center gap-1 w-full">
				<span className="w-32 h-3 bg-sidebar-accent/80 rounded-sm " />
				<span className="w-36 h-2.5 bg-sidebar-accent/70 rounded-sm " />
			</div>
		</div>
	);
};

export const UserRoundedButtonSkeleton = () => {
	return (
		<div className="size-10 rounded-full will-change-auto  bg-sidebar-accent/80 animate-pulse" />
	);
};
