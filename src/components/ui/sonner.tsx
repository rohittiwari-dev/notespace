"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={(theme as ToasterProps["theme"]) ?? "light"}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-300",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
