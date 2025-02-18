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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "@/lib/formschemas";
import { Button, buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goal, Loader2 } from "lucide-react";
import ThemeSwitcher from "@/components/app-ui/theme-switcher";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SigningPage: React.FC<Props> = ({ searchParams }) => {
    const router = useRouter();
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

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(_values: z.infer<typeof loginFormSchema>) {
        // const { message, success } = await loginServerActions(values);
        // if (!success) {
        // 	setSubmitError(message);
        // 	form.reset();
        // 	return;
        // }
        router.replace("/dashboard");
    }

    async function googleSignIn() {
        setIsOAuthLogin(true);
        // const { success, data, message } = await googleOAuthSignIn();
        // if (!success) {
        // 	setSubmitError(message);
        // 	form.reset();
        // 	setIsOAuthLogin(false);
        // 	return;
        // }
        // router.push(data.url as string);
    }

    return (
        <main className="container relative z-0 flex h-full w-full flex-col items-center">
            <ThemeSwitcher className="absolute top-8 right-10" />
            <Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl border-none bg-transparent bg-none shadow-none backdrop-blur-xl">
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
                            <div className="grid gap-4">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-gray-600 dark:text-neutral-300">
                                                    Enter Your Email
                                                </FormLabel>
                                                <FormControl className="my-2">
                                                    <Input
                                                        className="focus-visible:ring-1"
                                                        type="email"
                                                        placeholder="Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage
                                                    className={cn(
                                                        confirmAndErrorStyle,
                                                        "text-red-500"
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
                                                <FormLabel className="text-gray-600 dark:text-neutral-300">
                                                    Enter Your Password
                                                </FormLabel>
                                                <FormControl className="my-2">
                                                    <Input
                                                        type="password"
                                                        className="focus-visible:ring-1"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage
                                                    className={cn(
                                                        confirmAndErrorStyle,
                                                        "text-red-500"
                                                    )}
                                                />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <div className="my-2 w-full text-end">
                                <Link
                                    className={buttonVariants({
                                        variant: "link",
                                        className: "!p-0",
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
                                        "my-2 flex !h-fit items-center justify-between rounded-md p-2 px-3"
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
                        className="w-full cursor-pointer"
                    >
                        {isOAuthLogin ? (
                            <Loader2 className="size-5 animate-[spin_1.5s_linear_infinite] disabled:text-blue-800/40" />
                        ) : (
                            <>
                                <Goal /> Sign up with Google
                            </>
                        )}
                    </Button>
                    <div className="bg-primary-100/50 dark:bg-secondary-800/40 mt-3 w-full max-w-[calc(400px,90%)] rounded-xl px-5 py-3.5 text-center text-sm backdrop-blur-2xl">
                        <span>
                            Don't have a account ?{" "}
                            <Link
                                href="/signup"
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
