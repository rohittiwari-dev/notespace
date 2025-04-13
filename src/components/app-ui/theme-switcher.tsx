// components/ThemeSwitcher.js
'use client';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
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
		mounted && (
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
					{resolvedTheme === 'light' ? (
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
							<Moon className="text-primary-950 dark:text-primary-100 h-6 w-6 transition-colors duration-200" />
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
							<Sun className="text-primary-950 dark:text-primary-100 h-6 w-6 transition-colors duration-200" />
						</motion.div>
					)}
				</AnimatePresence>
			</Button>
		)
	);
}
