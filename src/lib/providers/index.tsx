'use client';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from './TRPCProvider';

interface TProviders {
	children: React.ReactNode;
}

const Providers: React.FC<TProviders> = ({ children }) => {
	return (
		<TRPCProvider>
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
		</TRPCProvider>
	);
};

export default Providers;
