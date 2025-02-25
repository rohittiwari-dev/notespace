import React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
	className,
	containerClass,
	type,
	rightIcon,
	leftIcon,
	id,
	...props
}: React.ComponentProps<"input"> & {
	containerClass?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<label htmlFor={id || ""} className="group block w-full">
			<div
				className={cn(
					"border-input bg-card/15 flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-xs",
					"focus-within:outline-ring/50 focus-within:ring-ring/10 focus-within:ring-2 focus-within:outline-2",
					"dark:focus-within:outline-ring/80 dark:focus-within:ring-ring/60",
					"aria-invalid:border-destructive/60 aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20",
					"dark:aria-invalid:border-destructive dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40",
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
					containerClass,
				)}
			>
				{leftIcon && (
					<span className="mr-2 flex items-center">{leftIcon}</span>
				)}
				<input
					id={id || ""}
					className={cn(
						"text-foreground !m-0 h-full w-full flex-1 bg-transparent px-0 py-0 text-sm outline-none",
						// Tailwind v4 autofill modifiers - these help but sometimes aren't enough
						"autofill:bg-transparent",
						"autofill:text-foreground",
						// Add any additional classes
						className,
					)}
					style={{
						WebkitBoxShadow:
							"0 0 0 1000px transparent inset !important",
						boxShadow: "0 0 0 1000px transparent inset !important",
						WebkitTextFillColor: "currentColor !important",
						backgroundColor: "transparent !important",
						backgroundClip: "content-box !important",
						transition:
							"background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
					}}
					type={
						type === "password"
							? showPassword
								? "text"
								: "password"
							: type
					}
					{...props}
				/>
				{type === "password" ? (
					<span
						className="ml-2 flex cursor-pointer items-center"
						onClick={togglePassword}
						tabIndex={-1}
					>
						{showPassword ? (
							<Eye className="hover:text-primary-500 dark:hover:text-primary-300 size-4 text-neutral-500 transition-all duration-500 active:scale-90" />
						) : (
							<EyeOff className="hover:text-primary-500 dark:hover:text-primary-300 size-4 text-neutral-500 transition-all duration-500 active:scale-90" />
						)}
					</span>
				) : (
					rightIcon && (
						<span className="ml-2 flex items-center">
							{rightIcon}
						</span>
					)
				)}
			</div>
		</label>
	);
};

export default InputField;
