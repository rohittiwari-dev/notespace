"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/Logo full.png";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
	googleOAuthSignIn,
	loginServerActions,
} from "@/services/server-actions/auth.server.action";
import { CircleDashed } from "lucide-react";
import { loginFormSchema } from "@/lib/form-schema/authSchema";

const LoginPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [submitError, setSubmitError] = useState("");
	const [isOAuthLogin, setIsOAuthLogin] = useState(false);

	// Error Triggers
	const exchangeError = useMemo(() => {
		if (!searchParams) return "";
		return searchParams.get("error_description");
	}, [searchParams]);
	const confirmAndErrorStyle = useMemo(() => {
		return cn("bg-brand-primaryPurple/10 px-2 text-primary", {
			"bg-red-500/10": exchangeError || submitError,
			"border-red-500/50": exchangeError || submitError,
			"text-red-500": exchangeError || submitError,
		});
	}, [exchangeError, submitError]);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		const { message, success } = await loginServerActions(values);
		if (!success) {
			setSubmitError(message);
			form.reset();
			return;
		}
		router.replace("/dashboard");
	}

	async function googleSignIn() {
		setIsOAuthLogin(true);
		const { success, data, message } = await googleOAuthSignIn();
		if (!success) {
			setSubmitError(message);
			form.reset();
			setIsOAuthLogin(false);
			return;
		}
		router.push(data.url as string);
	}

	return (
		<section className="flex min-h-full w-full items-center justify-center bg-custom-radial bg-35 -bg-pos-19 px-4 py-8">
			<Card className="w-full min-w-[270px] max-w-[28rem] border-washed-purple-900/50 bg-brand-dark shadow-lg shadow-washed-blue-900/50">
				<CardHeader className="text-center">
					<Link href={"/"}>
						<Image
							src={logoImg}
							alt={"Logo"}
							width={100}
							height={100}
							priority={true}
							quality={1}
							className="mx-auto h-auto w-[120px]"
						/>
					</Link>
					<CardTitle className="text-neutral-300">
						Login to Notespace
					</CardTitle>

					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="w-full">
					<form
						onChange={() => {
							if (submitError) setSubmitError("");
						}}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<Form {...form}>
							<div className="grid gap-4">
								{" "}
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className="text-neutral-300">
													Enter Your Email
												</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Email"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={
														confirmAndErrorStyle
													}
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
												<FormLabel className="text-neutral-300">
													Enter Your Password
												</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Password"
														{...field}
													/>
												</FormControl>
												<FormMessage
													className={
														confirmAndErrorStyle
													}
												/>
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="w-full text-end">
								<Link
									className={buttonVariants({
										variant: "link",
										className:
											"!p-0 text-washed-purple-600",
									})}
									href={"/forgot-password"}
								>
									forgot password?
								</Link>
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
										variant={"ghost"}
									>
										x
									</Button>
								</FormMessage>
							)}
							<div className="w-full space-y-3">
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
										<CircleDashed className="animate-[spin_1.5s_linear_infinite] disabled:text-washed-blue-800" />
									) : (
										"Login"
									)}
								</Button>
							</div>
						</Form>{" "}
					</form>{" "}
					<Button
						disabled={isOAuthLogin}
						onClick={googleSignIn}
						variant="outline"
						className="mt-4 w-full"
					>
						{isOAuthLogin ? (
							<CircleDashed className="animate-[spin_1.5s_linear_infinite] disabled:text-washed-blue-800" />
						) : (
							"Sign up with Google"
						)}
					</Button>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
};

export default LoginPage;
