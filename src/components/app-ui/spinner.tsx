import React from 'react';

import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerColor =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger';

interface SpinnerProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
	size?: SpinnerSize;
	color?: SpinnerColor;
	loadingLabel?: string | React.ReactNode;
	textClassName?: string;
	stroke?: string;
}

const sizeMap = {
	xs: 'h-3 w-3',
	sm: 'h-4 w-4',
	md: 'h-6 w-6',
	lg: 'h-8 w-8',
	xl: 'h-10 w-10',
};

const colorMap = {
	default: 'text-foreground',
	primary: 'text-primary',
	secondary: 'text-secondary',
	success: 'text-green-500',
	warning: 'text-yellow-500',
	danger: 'text-red-500',
};

const Spinner = ({
	className,
	loadingLabel,
	textClassName,
	size = 'md',
	color = 'default',
	stroke = '2',
	...props
}: SpinnerProps) => (
	<div
		className="inline-flex items-center gap-2"
		role="status"
		aria-live="polite"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={cn(
				sizeMap[size],
				colorMap[color],
				'animate-spin-cubic',
				className,
			)}
			style={{
				animationDuration: '0.8s',
			}}
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<style>
				{`
				@keyframes spin-cubic {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
				.animate-spin-cubic {
					animation: spin-cubic 0.8s linear infinite;
				}
				`}
			</style>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth={stroke}
				fill="none"
			/>
			<circle
				className="opacity-100"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth={stroke}
				strokeDasharray="40, 200"
				strokeDashoffset="0"
				strokeLinecap="round"
				fill="none"
			/>
		</svg>
		{loadingLabel &&
			(typeof loadingLabel === 'string' ? (
				<span className={cn('text-base', textClassName)}>
					{loadingLabel}
				</span>
			) : (
				loadingLabel
			))}
	</div>
);

export default Spinner;
