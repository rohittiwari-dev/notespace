"use client";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React, { use, useMemo, useState } from "react";
import logo from "@/assets/Logo_Full.png";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormSchema } from "@/lib/formschemas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ThemeSwitcher from "@/components/app-ui/theme-switcher";
import { authClientApi } from "@/lib/auth/client";
import { toast } from "sonner";
import InputField from "@/components/app-ui/input-field";
import { GoogleIcon, LockIcon, MailIcon, UserIcon } from "@/components/icons";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SigningPage: React.FC<Props> = ({ searchParams }) => {
	const [submitError, setSubmitError] = useState("");
	const [isOAuthLogin, setIsOAuthLogin] = useState(false);
	const shParams = use(searchParams);

	const exchangeError = useMemo(() => {
		if (!shParams) return "";
		return shParams.error_description;
	}, [shParams]);

	const confirmAndErrorStyle = useMemo(() => {
		return cn("bg-brand-primaryPurple/10 px-2 text-primary", {
			"bg-red-500/10": exchangeError || submitError,
			"border-red-500/50": exchangeError || submitError,
			"text-red-500": exchangeError || submitError,
		});
	}, [exchangeError, submitError]);

	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			confirmPassword: "",
		},
	});
	async function onSubmit(_values: z.infer<typeof SignUpFormSchema>) {
		await authClientApi.signUp.email(
			{
				email: _values.email,
				password: _values.password,
				name: `${_values.firstName} ${_values.lastName}`,
				callbackURL: "/dashboard",
			},
			{
				onRequest: () => {},
				onSuccess: () => {
					toast.success(
						`Verification Email sent to ${_values.email}`,
					);
				},
				onError: (ctx) => {
					toast.error(ctx.error.statusText);
				},
			},
		);
	}

	async function googleSignIn() {
		await authClientApi.signIn.social(
			{
				provider: "google",
				callbackURL: "/dashboard",
				errorCallbackURL: "/sign-in",
				requestSignUp: true,
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
		<main className="relative z-0 container flex h-fit min-h-full w-full flex-col items-center p-0">
			<ThemeSwitcher className="absolute top-8 right-2" />
			<Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl border-none !bg-transparent shadow-none">
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
							if (submitError) setSubmitError("");
						}}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<Form {...form}>
							<div className="mb-5 grid grid-cols-2 gap-4">
								<FormField
									name="firstName"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Your First Name
												</FormLabel>
												<FormControl className="my-2 mb-0">
													<InputField
														type="text"
														leftIcon={
															<UserIcon className="size-4" />
														}
														placeholder="Enter Your First Name"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														"text-red-500",
													)}
												/>
											</FormItem>
										);
									}}
								/>
								<FormField
									name="lastName"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Your Last Name
												</FormLabel>
												<FormControl className="my-2 mb-0">
													<InputField
														leftIcon={
															<UserIcon className="size-4" />
														}
														type="text"
														placeholder="Enter Your Last Name"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														"text-red-500",
													)}
												/>
											</FormItem>
										);
									}}
								/>
							</div>

							{/*Password Fields*/}
							<div className="mb-5 grid grid-cols-2 gap-4">
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Your Password
												</FormLabel>
												<FormControl className="my-2">
													<InputField
														leftIcon={
															<LockIcon className="size-5" />
														}
														type="password"
														placeholder="Your Password"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														"text-red-500",
													)}
												/>
											</FormItem>
										);
									}}
								/>{" "}
								<FormField
									name="confirmPassword"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Confirm Password
												</FormLabel>
												<FormControl className="my-2">
													<InputField
														leftIcon={
															<LockIcon className="size-5" />
														}
														type="password"
														placeholder="Confirm Your Password"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														"text-red-500",
													)}
												/>
											</FormItem>
										);
									}}
								/>
							</div>

							<div className="mb-6 grid gap-5">
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-foreground">
													Enter Your Email
												</FormLabel>
												<FormControl className="my-2">
													<InputField
														type="email"
														leftIcon={
															<MailIcon className="size-5" />
														}
														placeholder="Enter Your Email"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={cn(
														confirmAndErrorStyle,
														"text-red-500",
													)}
												/>
											</FormItem>
										);
									}}
								/>
							</div>

							{submitError && (
								<FormMessage
									className={cn(
										confirmAndErrorStyle,
										"my-2 flex !h-fit items-center justify-between rounded-md p-2 px-3",
									)}
								>
									{submitError}
									<Button
										type="button"
										onClick={() => setSubmitError("")}
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
										<Loader2 className="animate-[spin_1.5s_linear_infinite] disabled:text-blue-800/40" />
									) : (
										"Login"
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
							<Loader2 className="size-5 animate-[spin_1.5s_linear_infinite] disabled:text-blue-800/40" />
						) : (
							<>
								<GoogleIcon /> <span>Sign up with Google</span>
							</>
						)}
					</Button>
					<div className="bg-primary-100/50 dark:bg-secondary-800/40 mt-3 w-full max-w-[calc(400px,90%)] rounded-xl px-5 py-3.5 text-center text-sm backdrop-blur-2xl">
						<span>
							Already have a account ?{" "}
							<Link
								href="/sign-in"
								className="dark:text-foreground dark:hover:text-tertiary-150 text-violet-600/80 hover:text-violet-700/90"
							>
								Login Here
							</Link>
						</span>
					</div>
				</CardFooter>

				<p className="scale-80 text-center">&copy; 2025 NoteSpace</p>
				<p className="text-muted-foreground text-center">
					By clicking continue, you agree to our <br /> Terms of
					Service and Privacy Policy.
				</p>
			</Card>
		</main>
	);
};

export default SigningPage;
