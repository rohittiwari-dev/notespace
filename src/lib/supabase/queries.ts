"use server";
import db from "./db";
import { workspaces } from "./schema";
import { Subscription, Workspace } from "./superbase.types";

export async function getUserActiveSubscription(userId: string) {
	try {
		const data = await db.query.subscriptions.findFirst({
			where: (s, { eq }) => eq(s.userId, userId),
		});
		if (data) return { data: data as Subscription, error: null };
		else return { data: null, error: null };
	} catch (error) {
		return { data: null, error: "Error" };
	}
}

export async function getUserWorkspace(userId: string) {
	try {
		const data = await db.query.workspaces.findFirst({
			where: (workspace, { eq }) => eq(workspace.workspaceOwner, userId),
		});
		if (data) return data as Workspace;
		else return null;
	} catch (error) {
		return null;
	}
}

export async function createWorkspace(Workspace: Workspace) {
	try {
		const response = await db.insert(workspaces).values(Workspace);
		return { data: null, error: null };
	} catch (error) {
		return { data: null, error: "Error" };
	}
}
