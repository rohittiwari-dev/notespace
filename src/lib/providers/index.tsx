"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

type TProviders = {
	children: React.ReactNode;
};

const Providers: React.FC<TProviders> = ({ children }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			enableColorScheme
			disableTransitionOnChange
		>
			<Toaster />
			{children}
		</ThemeProvider>
	);
};

export default Providers;
