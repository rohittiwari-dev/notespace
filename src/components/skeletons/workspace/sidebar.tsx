export const SwitchItemSkeleton = () => {
	return (
		<div className="h-12 flex items-center space-x-3 will-change-auto">
			{/* Optimized square skeleton with reduced animation complexity */}
			<div className="bg-sidebar-primary/80 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg opacity-70">
				<div className="size-5 bg-sidebar-accent/50 rounded-sm" />
			</div>
			{/* Text skeleton with simplified animation */}
			<div className="flex-1 flex flex-col justify-center gap-1 w-full">
				<span className="w-32 h-3 bg-sidebar-accent/50 rounded-sm opacity-70" />
				<span className="w-28 h-2.5 bg-sidebar-accent/40 rounded-sm opacity-60" />
			</div>
		</div>
	);
};
