'use client';

import React, { use, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import logo from '@/assets/Logo_Full.png';
import InputField from '@/components/app-ui/input-field';
import Spinner from '@/components/app-ui/spinner';
import ThemeSwitcher from '@/components/app-ui/theme-switcher';
import { GoogleIcon, LockIcon, MailIcon } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { authClientApi } from '@/lib/auth/client';
import { loginFormSchema } from '@/lib/formschemas';
import { cn } from '@/lib/utils';

interface Props {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const SigningPage: React.FC<Props> = ({ searchParams }) => {
	const [submitError, setSubmitError] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isOAuthLogin, setIsOAuthLogin] = useState(false);
	const shParams = use(searchParams);

	const exchangeError = useMemo(() => {
		return shParams['error_description'] ?? '';
	}, [shParams]);

	const confirmAndErrorStyle = useMemo(() => {
		return cn('bg-brand-primaryPurple/10 px-2 text-primary', {
			'bg-red-500/10': exchangeError || submitError,
			'border-red-500/50': exchangeError || submitError,
			'text-red-500': exchangeError || submitError,
		});
	}, [exchangeError, submitError]);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	async function onSubmit(_values: z.infer<typeof loginFormSchema>) {
		return await authClientApi.signIn.email(
			{
				email: _values.email,
				password: _values.password,
				rememberMe: rememberMe,
				callbackURL: '/dashboard',
			},
			{
				onSuccess: () => {
					toast.success('Successfully logged in');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	}

	async function googleSignIn() {
		await authClientApi.signIn.social(
			{
				provider: 'google',
				callbackURL: '/dashboard',
				errorCallbackURL: '/sign-in',
			},
			{
				onRequest: () => {
					setIsOAuthLogin(true);
				},
				onError: (ctx) => {
					setIsOAuthLogin(false);
					toast.error(ctx.error.message);
				},
			},
		);
	}

	return (
		<main className="relative z-0 container flex h-full w-full flex-col items-center">
			<ThemeSwitcher className="absolute top-8 right-10" />
			<Card className="my-auto relative min-w-[min(400px,90%)] scale-90 rounded-xl border-none !bg-transparent shadow-none">
				<CardHeader className="items-center">
					<Image src={logo} alt="Logo" className="m-0 -ml-2 p-0" />
					<div className="mt-5 text-center">
						<h1>
							<strong>Welcome back!</strong>
						</h1>
						<p>Sign in to your account to continue.</p>
					</div>
				</CardHeader>
				<CardContent>
					<form
						onChange={() => {
							if (submitError) setSubmitError('');
						}}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<Form {...form}>
							<div className="grid gap-4">
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Enter Your Email
												</FormLabel>
												<FormControl className="my-2 mb-0">
													<InputField
														type="email"
														leftIcon={
															<MailIcon className="size-5" />
														}
														placeholder="Email"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														'p-0 text-red-500',
													)}
												/>
											</FormItem>
										);
									}}
								/>
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Enter Your Password
												</FormLabel>
												<FormControl className="my-2 mb-0">
													<InputField
														leftIcon={
															<LockIcon className="size-5" />
														}
														type="password"
														placeholder="Password"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														'text-red-500',
													)}
												/>
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="my-2 flex w-full items-center justify-between text-end">
								<Label className="flex items-center gap-2">
									<Checkbox
										title="Remember me"
										checked={rememberMe}
										onCheckedChange={(checked) => {
											setRememberMe(checked === true);
										}}
									/>
									<span>Remember me</span>
								</Label>
								<Link
									className={buttonVariants({
										variant: 'link',
										className: '!p-0',
									})}
									href="/forgot-password"
								>
									forgot password?
								</Link>
							</div>
							{submitError && (
								<FormMessage
									className={cn(
										confirmAndErrorStyle,
										'my-2 flex !h-fit items-center justify-between rounded-md p-2 px-3',
									)}
								>
									{submitError}
									<Button
										type="button"
										onClick={() => {
											setSubmitError('');
										}}
										className="!h-8 !w-5 !rounded-full text-lg"
										variant="ghost"
									>
										x
									</Button>
								</FormMessage>
							)}
							<div className="mt-3 w-full space-y-3">
								<Button
									type="submit"
									disabled={
										form.formState.isLoading ||
										form.formState.isSubmitting
									}
									className="w-full"
								>
									{form.formState.isLoading ||
									form.formState.isSubmitting ? (
										<Spinner
											className="disabled:text-blue-800/40"
											loadingLabel="Signing in..."
										/>
									) : (
										'Sign in'
									)}
								</Button>
							</div>
						</Form>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-3">
					<Button
						disabled={isOAuthLogin}
						onClick={googleSignIn}
						variant="secondary"
						className="w-full"
					>
						{isOAuthLogin ? (
							<Spinner
								className="disabled:text-blue-800/40"
								loadingLabel="Signing in with Google..."
							/>
						) : (
							<>
								<GoogleIcon /> <span>Sign in with Google</span>
							</>
						)}
					</Button>
					<div className="bg-primary-100/50 dark:bg-secondary-800/40 mt-3 w-full max-w-[calc(400px,90%)] rounded-xl px-5 py-3.5 text-center text-sm backdrop-blur-2xl">
						<span>
							Don&apos;t have a account ?{' '}
							<Link
								href="/sign-up"
								className="dark:text-foreground dark:hover:text-tertiary-150 text-violet-600/80 hover:text-violet-700/90"
							>
								Sign Up Here
							</Link>
						</span>
					</div>
				</CardFooter>
				<p className="scale-80 text-center">&copy; 2025 NoteSpace</p>
			</Card>
		</main>
	);
};

export default SigningPage;
