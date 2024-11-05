"use client";
import React from "react";
import { AuthUser } from "@supabase/supabase-js";
import { Subscription, Workspace } from "@/lib/supabase/superbase.types";
import EmojiPicker from "../EmojyPicker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Loader, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "../ui/use-toast";
import { createWorkspace } from "@/lib/supabase/queries";

interface IWorkspaceSetup {
	user: AuthUser;
	subscription: Subscription | null;
}

const WorkspaceSetup: React.FC<IWorkspaceSetup> = ({ user, subscription }) => {
	const router = useRouter();
	const { toast } = useToast();
	const [selectedEmoji, setSelectedEmoji] = React.useState("💼");
	const supabase = createClientComponentClient();

	// Initialize the useForm hook for form handling
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting: isSubmitLoading, errors, isLoading },
	} = useForm<FieldValues>({
		mode: "onChange",
		defaultValues: {
			logo: "",
			workspaceName: "",
		},
	});

	// Define the form submission logic
	const onSubmit: SubmitHandler<FieldValues> = async (value) => {
		const file = value.logo?.[0];
		let filePath = null;
		const workspaceUUID = v4();

		// Check if a file (logo) is provided and handle its upload
		if (file) {
			try {
				const fileUUID = v4();
				const { data, error } = await supabase.storage
					.from("workspace-logos")
					.upload(
						`workspaceLogo.${workspaceUUID}.${fileUUID}`,
						file,
						{
							cacheControl: "3600",
							upsert: false,
						},
					);
				if (error) throw new Error("");
				filePath = data.path;
			} catch (storageError) {
				console.log(storageError);
				toast({
					variant: "destructive",
					title: "Error! Could not upload your workspace picture",
				});
			}
		}

		// Create a new workspace record and handle potential errors
		try {
			const newWorkspace: Workspace = {
				data: null,
				createdAt: new Date().toISOString(),
				iconId: selectedEmoji,
				id: workspaceUUID,
				inTrash: "",
				title: value.workspaceName,
				workspaceOwner: user.id,
				logo: filePath || null,
				bannerUrl: null,
			};
			await createWorkspace(newWorkspace);

			// Display a success toast and redirect to the workspace dashboard
			toast({
				title: "Workspace Created",
				description: `${newWorkspace.title} has been created successfully.`,
			});

			router.replace(`/dashboard/${newWorkspace.id}`);
		} catch (error) {
			// Handle errors when creating a workspace
			toast({
				variant: "destructive",
				title: "Could not create your workspace",
				description:
					"Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
			});
		} finally {
			reset();
		}
	};

	return (
		<section className="flex h-full w-full items-center justify-center">
			<Card className="h-screen w-[800px] sm:h-auto">
				<CardHeader>
					<CardTitle>Setup Your Workspace</CardTitle>
					<CardDescription>
						Lets create and Setup Your private workspace to get you
						started.You can add collaborators later from the
						workspace settings tab.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<div className="text-5xl">
									<EmojiPicker
										getEmoji={(emoji) => {
											setSelectedEmoji(emoji);
										}}
									>
										{selectedEmoji}
									</EmojiPicker>
								</div>
								<div className="w-full">
									<Label
										htmlFor="workspaceName"
										className="text-sm text-muted-foreground"
									>
										Name
									</Label>
									<Input
										id="workspaceName"
										type="text"
										placeholder="Workspace Name"
										disabled={isLoading || isSubmitLoading}
										{...register("workspaceName", {
											required:
												"Workspace name is required",
										})}
									/>
									<small className="text-red-600">
										{errors?.workspaceName?.message?.toString()}
									</small>
								</div>
							</div>
							<div>
								<label
									htmlFor="workspaceLogo"
									className="text-sm text-muted-foreground"
								>
									Workspace Logo
								</label>

								<Input
									disabled={
										isLoading || isSubmitLoading
										// ||
										// subscription?.status !== "active"
									}
									id="logo"
									type="file"
									accept="image/*"
									placeholder="Workspace Logo"
									{...register("logo", { required: false })}
								/>
								<small className="text-red-600">
									{errors?.logo?.message?.toString()}
								</small>
								{subscription?.status !== "active" && (
									<small className="text-washed-blue-800">
										To customize your workspace, you need to
										be on a Pro Plan
									</small>
								)}
							</div>

							<div className="self-end">
								<Button
									disabled={isLoading || isSubmitLoading}
									type="submit"
								>
									{!isLoading || isSubmitLoading ? (
										"Create Workspace"
									) : (
										<Loader2 className="animate-spin" />
									)}
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	);
};

export default WorkspaceSetup;
