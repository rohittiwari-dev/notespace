"use client";
import Link from "next/link";
import logoImg from "@/assets/Logo full.png";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "@/lib/form-schema/authSchema";
import { signupServerAction } from "@/services/server-actions/auth.server.action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import React from "react";

const SignUpForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [submitError, setSubmitError] = useState("");
	const [confirmation, setConfirmation] = useState<boolean>(false);

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

	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			fullName: "",
		},
	});

	// form onSubmit handler
	async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
		const { message, success } = await signupServerAction(values);
		if (!success) {
			setSubmitError(message);
			form.reset();
			return;
		}
		setConfirmation(true);
	}

	return (
		<section className="flex justify-center items-center -bg-pos-19 bg-35 bg-custom-radial px-4 py-8 w-full min-h-full">
			<Card className="border-washed-purple-900/50 bg-brand-dark shadow-lg shadow-washed-blue-900/50 w-full min-w-[270px] max-w-[28rem]">
				<CardHeader className="text-center">
					<Link href={"/"}>
						<Image
							src={logoImg}
							alt={"Logo"}
							width={100}
							height={100}
							priority={true}
							quality={1}
							className="mx-auto w-[120px] h-auto"
						/>
					</Link>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent className="w-full">
					<Form {...form}>
						<form
							onChange={() => {
								if (confirmation) setConfirmation(false);
								if (submitError) setSubmitError("");
							}}
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="gap-4 grid">
								<Label htmlFor="fullName">Name</Label>
								<FormField
									name="fullName"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												<FormControl>
													<Input
														id="fullName"
														placeholder="Enter your name"
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

								<div className="gap-2 grid">
									<Label htmlFor="email">Email</Label>
									<FormField
										name="email"
										control={form.control}
										render={({ field }) => {
											return (
												<FormItem>
													<FormControl>
														<Input
															id="email"
															placeholder="Enter your Email"
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
								<div className="gap-2 grid">
									<Label htmlFor="password">Password</Label>
									<FormField
										name="password"
										control={form.control}
										render={({ field }) => {
											return (
												<FormItem>
													<FormControl>
														<Input
															id="password"
															type="password"
															placeholder="Enter your Password"
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
								<div className="gap-2 grid">
									<Label htmlFor="password">
										Confirm Password
									</Label>
									<FormField
										name="confirmPassword"
										control={form.control}
										render={({ field }) => {
											return (
												<FormItem>
													<FormControl>
														<Input
															id="confirmPassword"
															type="password"
															placeholder="Confirm your Password"
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
								{(confirmation ||
									exchangeError ||
									submitError) && (
									<React.Fragment>
										{/* Conditional rendering based on confirmation and codeExchangeError */}
										<Alert
											className={cn(
												confirmAndErrorStyle,
												"my-2",
											)}
										>
											{!exchangeError && (
												<MailCheck className="w-4 h-4" />
											)}
											<AlertTitle className="">
												{exchangeError
													? "Invalid Link"
													: submitError
													? "Invalid Email"
													: "Check your email."}
											</AlertTitle>
											<AlertDescription>
												{exchangeError ||
													submitError ||
													"An email confirmation has been sent."}
											</AlertDescription>
										</Alert>
										{exchangeError && (
											<span className="self-center">
												Try again?{" "}
												<Link
													href="/signup"
													className="text-primary"
												>
													Sign Up
												</Link>
											</span>
										)}
									</React.Fragment>
								)}
								<Button type="submit" className="w-full">
									Create an account
								</Button>
							</div>
						</form>
						<Button variant="outline" className="mt-4 w-full">
							Sign up with Google
						</Button>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link href="/login" className="underline">
								Sign in
							</Link>
						</div>
					</Form>
				</CardContent>
			</Card>
		</section>
	);
};

export default SignUpForm;
