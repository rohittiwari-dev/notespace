"use server";
import { validate } from "uuid";
import db from "./db";
import { collaborators, folders, users, workspaces } from "./schema";
import { Folder, Subscription, Workspace } from "./superbase.types";
import { and, eq, notExists } from "drizzle-orm";
import { title } from "process";
import { date } from "drizzle-orm/mysql-core";

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
		return { data: response, error: null };
	} catch (error) {
		return { data: null, error: "Error" };
	}
}

export async function getFolderByWorkspaceId(workspaceId: string) {
	if (!workspaceId || !validate(workspaceId))
		return { data: null, error: "Error" };
	try {
		const data = await db
			.select()
			.from(folders)
			.orderBy(folders.createdAt)
			.where(eq(folders.workspaceId, workspaceId));
		return { data, error: null };
	} catch (error) {
		return { data: null, error: "Error" };
	}
}

export async function getPrivateWorkspaces(
	userId: string,
): Promise<Workspace[]> {
	if (!userId) return [];
	try {
		const privateWorkspaces = (await db
			.select({
				id: workspaces.id,
				createdAt: workspaces.createdAt,
				workspaceOwner: workspaces.workspaceOwner,
				title: workspaces.title,
				logo: workspaces.logo,
				data: workspaces.data,
				iconId: workspaces.iconId,
				inTrash: workspaces.inTrash,
			})
			.from(workspaces)
			.where(
				and(
					notExists(
						db
							.select()
							.from(collaborators)
							.where(
								eq(collaborators.workspaceId, workspaces.id),
							),
					),
					eq(workspaces.workspaceOwner, userId),
				),
			)) as Workspace[];
		return privateWorkspaces;
	} catch {
		return [];
	}
}

export const getCollaboratingWorkspaces = async (
	userId: string,
): Promise<Workspace[]> => {
	if (!userId) return [];
	try {
		const collaboratorWorkspaces = (await db
			.select({
				id: workspaces.id,
				createdAt: workspaces.createdAt,
				workspaceOwner: workspaces.workspaceOwner,
				title: workspaces.title,
				logo: workspaces.logo,
				data: workspaces.data,
				iconId: workspaces.iconId,
				inTrash: workspaces.inTrash,
			})
			.from(users)
			.innerJoin(collaborators, eq(users.id, collaborators.userId))
			.innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
			.where(eq(users.id, userId))) as Workspace[];
		return collaboratorWorkspaces;
	} catch {
		return [];
	}
};

export const getSharedWorkspaces = async (
	userId: string,
): Promise<Workspace[]> => {
	if (!userId) return [];
	try {
		const sharedWorkspaces = (await db
			.selectDistinct({
				id: workspaces.id,
				createdAt: workspaces.createdAt,
				workspaceOwner: workspaces.workspaceOwner,
				title: workspaces.title,
				logo: workspaces.logo,
				data: workspaces.data,
				iconId: workspaces.iconId,
				inTrash: workspaces.inTrash,
			})
			.from(workspaces)
			.orderBy(workspaces.createdAt)
			.innerJoin(
				collaborators,
				eq(workspaces.id, collaborators.workspaceId),
			)
			.where(eq(workspaces.workspaceOwner, userId))) as Workspace[];
		return sharedWorkspaces;
	} catch {
		return [];
	}
};
