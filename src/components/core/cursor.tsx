"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	SpringOptions,
	Transition,
	useMotionValue,
	useSpring,
	Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type CursorProps = {
	children: React.ReactNode;
	className?: string;
	springConfig?: SpringOptions;
	attachToParent?: boolean;
	transition?: Transition;
	variants?: {
		initial: Variant;
		animate: Variant;
		exit: Variant;
	};
	onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
	children,
	className,
	springConfig,
	attachToParent,
	variants,
	transition,
	onPositionChange,
}: CursorProps) {
	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);
	const cursorRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(!attachToParent);

	useEffect(() => {
		if (typeof window !== "undefined") {
			cursorX.set(window.innerWidth / 2);
			cursorY.set(window.innerHeight / 2);
		}
	}, [cursorX, cursorY]);

	useEffect(() => {
		if (!attachToParent) {
			document.body.style.cursor = "none";
		} else {
			document.body.style.cursor = "auto";
		}

		const updatePosition = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
			onPositionChange?.(e.clientX, e.clientY);
		};

		document.addEventListener("mousemove", updatePosition);

		return () => {
			document.removeEventListener("mousemove", updatePosition);
		};
	}, [attachToParent, cursorX, cursorY, onPositionChange]);

	const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
	const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });
	useEffect(() => {
		const handleVisibilityChange = (visible: boolean) => {
			setIsVisible(visible);
		};

		// Store cursorRef.current in a variable
		const cursorElement = cursorRef.current;

		if (attachToParent && cursorElement) {
			const parent = cursorElement.parentElement;
			if (parent) {
				// Define event handlers
				const handleMouseEnter = () => {
					parent.style.cursor = "none";
					handleVisibilityChange(true);
				};
				const handleMouseLeave = () => {
					parent.style.cursor = "auto";
					handleVisibilityChange(false);
				};

				// Add event listeners
				parent.addEventListener("mouseenter", handleMouseEnter);
				parent.addEventListener("mouseleave", handleMouseLeave);

				// Cleanup function
				return () => {
					parent.removeEventListener("mouseenter", handleMouseEnter);
					parent.removeEventListener("mouseleave", handleMouseLeave);
				};
			}
		}
	}, [attachToParent]);

	return (
		<motion.div
			ref={cursorRef}
			className={cn(
				"pointer-events-none fixed top-0 left-0 z-50",
				className,
			)}
			style={{
				x: cursorXSpring,
				y: cursorYSpring,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
						transition={transition}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
