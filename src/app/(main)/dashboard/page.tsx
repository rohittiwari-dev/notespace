import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import {
	getUserActiveSubscription,
	getUserWorkspace,
} from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import WorkspaceSetup from "@/components/workspace-setup";

const Dashboard = async () => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return;

	const workspace = await getUserWorkspace(user.id);

	const { error: subscriptionError, data: Subscription } =
		await getUserActiveSubscription(user.id);

	if (subscriptionError) return;
	if (!workspace)
		return <WorkspaceSetup user={user} subscription={Subscription} />;

	redirect("/dashboard/" + workspace.id);
};

export default Dashboard;
