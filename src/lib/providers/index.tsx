"use client";
import store from "@/state-store";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<>{children}</>
			</ThemeProvider>
		</Provider>
	);
};

export default Providers;
