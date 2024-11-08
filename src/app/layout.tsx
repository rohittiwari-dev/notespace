import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/providers/ThemeProvider";
import React from "react";
import Providers from "@/lib/providers";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notespace",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark" style={{ colorScheme: "dark" }}>
			<body className={dmSans.className}>
				<Providers>
					<>{children}</>
				</Providers>
			</body>
		</html>
	);
}
