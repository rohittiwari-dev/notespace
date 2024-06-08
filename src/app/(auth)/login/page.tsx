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
import { loginServerActions } from "@/services/server-actions/auth.server.action";
import { Circle } from "lucide-react";
import { loginFormSchema } from "@/lib/form-schema/authSchema";

const LoginPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [submitError, setSubmitError] = useState("");

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
							<div className="gap-4 grid">
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
											"text-washed-purple-600 !p-0 ",
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
										"p-2 px-3 !h-fit rounded-md my-2 flex justify-between items-center",
									)}
								>
									{submitError}
									<Button
										type="button"
										onClick={() => setSubmitError("")}
										className="!rounded-full !w-5 !h-8 text-lg"
										variant={"ghost"}
									>
										x
									</Button>
								</FormMessage>
							)}
							<div className="space-y-3 w-full">
								<Button
									type="submit"
									disabled={form.formState.isLoading}
									className="w-full"
								>
									{form.formState.isLoading ? (
										<Circle className="animate-spin" />
									) : (
										"Login"
									)}
								</Button>
							</div>
						</Form>{" "}
					</form>{" "}
					<Button variant="outline" className="mt-4 w-full">
						Login with Google
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
