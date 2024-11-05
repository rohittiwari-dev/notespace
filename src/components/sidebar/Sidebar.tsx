import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FC } from "react";
import { cookies } from "next/headers";
import {
	getCollaboratingWorkspaces,
	getFolderByWorkspaceId,
	getPrivateWorkspaces,
	getSharedWorkspaces,
	getUserActiveSubscription,
} from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { setTimeout } from "timers";
import { cn } from "@/lib/utils";
import WorkspaceDropdown from "./WorkspaceDropdown";
import { Workspace } from "@/lib/supabase/superbase.types";

interface SideBarProps {
	params: { workspaceId: string };
	className?: string;
}

const Sidebar: FC<SideBarProps> = async ({ params, className }) => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("no session user found");

	// subscription
	const { data: subscriptionData, error: subscriptionError } =
		await getUserActiveSubscription(user.id);

	const { data: workspaceFolderData, error: folderError } =
		await getFolderByWorkspaceId(params.workspaceId);

	if (subscriptionError || folderError) {
		redirect("/dashboard");
	}

	const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
		await Promise.all([
			getPrivateWorkspaces(user?.id),
			getCollaboratingWorkspaces(user?.id),
			getSharedWorkspaces(user?.id),
		]);

	return (
		<aside
			className={cn(
				"hidden w-[280px] shrink-0 !justify-between p-4 sm:flex sm:flex-col md:gap-4",
				className,
			)}
		>
			<div>
				<WorkspaceDropdown
					collaboratingWorkspaces={collaboratingWorkspaces}
					privateWorkspaces={privateWorkspaces}
					sharedWorkspaces={sharedWorkspaces}
					defaultValue={[
						...collaboratingWorkspaces,
						...privateWorkspaces,
						...sharedWorkspaces,
					].find((val) => val.id === params.workspaceId)}
				/>
			</div>
		</aside>
	);
};

export default Sidebar;
