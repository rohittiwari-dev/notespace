import React, { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckStateButtonProps = {
	checked?: boolean;
	onChecked?: (val: boolean) => void;
	label?: string;
	body?: React.ReactNode;
	showBottomLabel?: boolean;
	containerClassName?: string;
};

const CheckStateButton: FC<CheckStateButtonProps> = ({
	checked: coreChecked,
	onChecked,
	body,
	label,
	showBottomLabel = false,
	containerClassName,
}) => {
	const [checked, setChecked] = useState(false);
	// Use a separate state for client-side rendering to avoid hydration mismatch
	const [isMounted, setIsMounted] = useState(false);

	// Update checked state when coreChecked prop changes
	useEffect(() => {
		if (coreChecked !== undefined) {
			setChecked(coreChecked);
		}
	}, [coreChecked]);

	// Set mounted state after hydration
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="flex items-start gap-2 flex-col">
			<Button
				onClick={() => {
					setChecked(!checked);
					if (onChecked) onChecked(!checked);
				}}
				className={cn(
					' !bg-transparent hover:opacity-80 overflow-hidden hover:scale-102 !p-0 relative transition-all duration-300  !ring-offset-2 ring-offset-secondary !border-2 !border-violet-500/80 !ring-violet-500/60 rounded-lg hover:ring-4',
					containerClassName,
				)}
			>
				{body || (
					<span className="text-sm font-medium text-gray-900 dark:text-gray-300">
						{label || (checked ? 'Enabled' : 'Disabled')}
					</span>
				)}
				{/* Only render the CheckCircle2 component after hydration to ensure server/client match */}
				{isMounted && (coreChecked || checked) && (
					<CheckCircle2 className="absolute dark:fill-accent fill-primary/80 size-5 left-1 bottom-1 text-white" />
				)}
			</Button>
			{showBottomLabel && (
				<span className="text-sm font-medium text-secondary-800 dark:text-secondary-100">
					{label || (checked ? 'Enabled' : 'Disabled')}
				</span>
			)}
		</div>
	);
};

export default CheckStateButton;
