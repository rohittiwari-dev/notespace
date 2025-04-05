'use client';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from './TRPCProvider';
import { StoreProvider } from '@/store';

interface TProviders {
	children: React.ReactNode;
}

const Providers: React.FC<TProviders> = ({ children }) => {
	return (
		<TRPCProvider>
			<StoreProvider>
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
			</StoreProvider>
		</TRPCProvider>
	);
};

export default Providers;
