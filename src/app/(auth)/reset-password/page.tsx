"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InputField from "@/components/app-ui/input-field";
import { authClient } from "@/lib/server";
import ThemeSwitcher from "@/components/app-ui/theme-switcher";
import Spinner from "@/components/app-ui/spinner";

export default function ResetPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get("token")!;
		if (!token) {
			redirect("/sign-in");
		}
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		const res = await authClient.resetPassword({
			newPassword: password,
			token: new URLSearchParams(window.location.search).get("token")!,
		});
		if (res.error) {
			toast.error(res.error.message);
		}
		setIsSubmitting(false);
		router.push("/sign-in");
	}
	return (
		<div className="relative z-0 container flex h-full w-full flex-col items-center">
			<ThemeSwitcher className="absolute top-8 right-10" />
			<Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl border-none !bg-transparent shadow-none">
				<CardHeader>
					<CardTitle>Reset password</CardTitle>
					<CardDescription>
						Enter new password and confirm it to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col gap-4">
								<Label htmlFor="email">New password</Label>
								<InputField
									type="password"
									id="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									autoComplete="password"
									placeholder="Password"
								/>
							</div>
							<div className="flex flex-col gap-4">
								<Label htmlFor="email">Confirm password</Label>
								<InputField
									type="password"
									id="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									autoComplete="password"
									placeholder="Password"
								/>
							</div>
						</div>
						{error && (
							<Alert variant="destructive" className="mt-6">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button
							className="mt-6 w-full"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting && <Spinner />}
							{isSubmitting ? "Resetting..." : "Reset password"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
