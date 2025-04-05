import React from 'react';
import { motion } from 'motion/react';

function AnimatedTabContent({
	animationVariant = 'slide',
	children,
}: {
	animationVariant?: 'fade' | 'slide' | 'zoom';
	children: React.ReactNode;
}) {
	return (
		<motion.div
			className="w-full bg-secondary shadow p-4 rounded-xl flex flex-col gap-4"
			{...{
				fade: {
					initial: { opacity: 0, x: -20, scale: 0.95 },
					animate: { opacity: 1, x: 0, scale: 1 },
					transition: {
						duration: 0.3,
						ease: 'easeOut',
						staggerChildren: 0.1,
					},
					exit: {
						opacity: 0,
						x: 20,
						scale: 0.95,
						transition: {
							duration: 0.2,
							ease: 'easeIn',
						},
					},
				},
				slide: {
					initial: { opacity: 0, y: 10 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
					exit: { opacity: 0, y: -10 },
				},
				zoom: {
					initial: { opacity: 0, scale: 0.95 },
					animate: { opacity: 1, scale: 1 },
					transition: { duration: 0.3 },
					exit: { opacity: 0, scale: 0.95 },
				},
			}[animationVariant]}
		>
			{children}
		</motion.div>
	);
}

export default AnimatedTabContent;
