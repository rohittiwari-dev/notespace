// components/ThemeSwitcher.js
'use client';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
	IconSunFilled,
	IconMoonFilled,
	IconDeviceDesktopFilled,
} from '@tabler/icons-react';

export default function ThemeSwitcher({
	className,
	variant = 'multiple',
}: {
	className?: string;
	variant?: 'single' | 'multiple';
}) {
	const { resolvedTheme, setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Toggle theme function
	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted &&
		(variant === 'multiple' ? (
			<VariantMultipleButton
				className={className}
				setTheme={setTheme}
				theme={theme as any}
			/>
		) : (
			<VariantSingleButton
				className={className}
				toggleTheme={toggleTheme}
				theme={resolvedTheme as 'light' | 'dark'}
			/>
		))
	);
}

const VariantSingleButton = ({
	className,
	toggleTheme,
	theme,
}: {
	className?: string;
	toggleTheme: () => void;
	theme: 'light' | 'dark';
}) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className={cn(
				'dark:bg-secondary-700/60 bg-secondary-100 ring-1 !ring-accent/80 rounded-full p-4 transition-colors duration-200 hover:dark:bg-primary/40',
				className,
			)}
		>
			<AnimatePresence mode="wait" initial={false}>
				{theme === 'light' ? (
					<motion.div
						key="moon"
						initial={{ scale: 0.8, opacity: 0.5 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{
							scale: 0.8,
							opacity: 0.5,
						}}
						transition={{ duration: 0.2 }}
					>
						<IconMoonFilled className="text-primary-700/80 dark:text-primary-100 h-6 w-6 transition-colors duration-200" />
					</motion.div>
				) : (
					<motion.div
						key="sun"
						initial={{ scale: 0.8, opacity: 0.5 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{
							scale: 0.8,
							opacity: 0.5,
						}}
						transition={{ duration: 0.2 }}
					>
						<IconSunFilled className="text-primary-700/80 dark:text-primary-100 h-6 w-6 transition-colors duration-200" />
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	);
};

const VariantMultipleButton = ({
	className,
	setTheme,
	theme,
	themes = [
		{ key: 'light', icon: IconSunFilled, label: 'Light Theme' },
		{ key: 'dark', icon: IconMoonFilled, label: 'Dark Theme' },
		{ key: 'system', icon: IconDeviceDesktopFilled, label: 'System Theme' },
	],
}: {
	className?: string;
	setTheme: (theme: 'light' | 'dark' | 'system') => void;
	theme: 'light' | 'dark';
	themes?: Array<{ key: string; icon: React.ElementType; label: string }>;
}) => {
	return (
		<div
			className={cn(
				'relative flex h-8 rounded-full bg-background/50 p-1 ring-1 ring-border',
				className,
			)}
		>
			{themes.map(({ key, icon: Icon, label }) => {
				const isActive = theme === key;

				return (
					<button
						type="button"
						key={key}
						className="relative h-6 w-6 cursor-pointer rounded-full"
						onClick={() =>
							setTheme(key as 'light' | 'dark' | 'system')
						}
						aria-label={label}
					>
						{isActive && (
							<motion.div
								layoutId="activeTheme"
								className="absolute inset-0 rounded-full dark:bg-primary-600/80 bg-primary-100"
								transition={{ type: 'spring', duration: 0.5 }}
							/>
						)}
						<Icon
							className={cn(
								'relative m-auto h-4 w-4 ',
								isActive
									? 'text-primary-400 dark:text-primary-200'
									: 'text-primary-700/80 dark:text-primary-100',
							)}
						/>
					</button>
				);
			})}
		</div>
	);
};
