"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";

type TProviders = {
	children: React.ReactNode;
};

const Providers: React.FC<TProviders> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			{children}
		</ThemeProvider>
	);
};

export default Providers;
