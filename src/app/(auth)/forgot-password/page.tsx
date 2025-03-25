'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ThemeSwitcher from '@/components/app-ui/theme-switcher';
import type { BetterAuthError } from 'better-auth';
import { authClientApi } from '@/lib/auth/client';
import { ShineBorder } from '@/components/primitives/shine-border';
import { useTheme } from 'next-themes';

export default function Component() {
	const { theme } = useTheme();
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			await authClientApi.forgetPassword({
				email,
				redirectTo: '/reset-password',
			});
			setIsSubmitted(true);
		} catch (err) {
			setError(
				`An error occurred. Please try again. ${(err as BetterAuthError).message}`,
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<main className="relative z-0 container flex h-full w-full flex-col items-center">
				<ThemeSwitcher className="absolute top-8 right-10" />
				<Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl border-none !bg-transparent shadow-none">
					<ShineBorder
						shineColor={
							theme == 'dark'
								? [
										'var(--color-primary-800)',
										'var(--color-primary-900)',
										'var(--color-primary-700)',
									]
								: [
										'var(--color-primary-100)',
										'var(--color-primary-200)',
										'var(--color-primary-100)',
									]
						}
					/>
					<CardHeader>
						<CardTitle>Check your email</CardTitle>
						<CardDescription>
							We&apos;ve sent a password reset link to your email.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert variant="info">
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription>
								If you don&apos;t see the email, check your spam
								folder.
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => {
								setIsSubmitted(false);
							}}
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Back to reset
							password
						</Button>
					</CardFooter>
				</Card>
			</main>
		);
	}

	return (
		<main className="relative z-0 container flex h-full w-full flex-col items-center">
			<ThemeSwitcher className="absolute top-8 right-10" />
			<Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl border-none !bg-transparent shadow-none">
				<ShineBorder
					shineColor={
						theme == 'dark'
							? [
									'var(--color-primary-800)',
									'var(--color-primary-900)',
									'var(--color-primary-700)',
								]
							: [
									'var(--color-primary-100)',
									'var(--color-primary-200)',
									'var(--color-primary-100)',
								]
					}
				/>
				<CardHeader className="gap-4">
					<CardTitle>Forgot password</CardTitle>
					<CardDescription>
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col gap-4">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									required
								/>
							</div>
						</div>
						{error && (
							<Alert variant="destructive" className="mt-4">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button
							className="mt-4 w-full"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Sending...' : 'Send reset link'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/sign-in">
						<Button variant="link" className="px-0">
							Back to sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}
