"use client";
import { Workspace } from "@/lib/supabase/superbase.types";
import { useAppDispatch, useAppSelector } from "@/state-store";
import { setWorkspaces } from "@/state-store/actions";
import React, { FC, useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";

interface WorkspacesDropdownProps {
	privateWorkspaces: Workspace[];
	sharedWorkspaces: Workspace[];
	collaboratingWorkspaces: Workspace[];
	defaultValue?: Workspace;
}

const WorkspaceDropdown: FC<WorkspacesDropdownProps> = ({
	collaboratingWorkspaces,
	defaultValue,
	privateWorkspaces,
	sharedWorkspaces,
}) => {
	const dispatch = useAppDispatch();
	const { workspaces } = useAppSelector((state) => state.workspace);
	const [selectedWorkspace, setSelectedWorkspace] = useState(defaultValue);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!workspaces.length) {
			dispatch(
				setWorkspaces(
					[
						...collaboratingWorkspaces,
						...sharedWorkspaces,
						...privateWorkspaces,
					].map((val) => ({ ...val, folders: [] })),
				),
			);
		}
	}, [
		privateWorkspaces,
		collaboratingWorkspaces,
		sharedWorkspaces,
		workspaces.length,
		dispatch,
	]);

	useEffect(() => {
		const findSelectedWorkspace = workspaces.find(
			(workspace) => workspace.id === defaultValue?.id,
		);
		if (findSelectedWorkspace) setSelectedWorkspace(findSelectedWorkspace);
	}, [defaultValue, workspaces]);

	const handleSelectWorkspace = (option: Workspace) => {
		setSelectedWorkspace(option);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left">
			<div>
				<span onClick={() => setIsOpen(!isOpen)}>
					{selectedWorkspace ? (
						<SelectedWorkspace workspace={selectedWorkspace} />
					) : (
						<div className="text-lg">Select a Workspace</div>
					)}
				</span>
			</div>
			{isOpen && (
				<div className="group absolute z-50 h-[190px] w-full origin-top-right overflow-y-auto rounded-md border-[1px] border-muted bg-black/10 shadow-md backdrop-blur-lg">
					<div className="flex flex-col rounded-md">
						<div className="!p-2">
							{!!privateWorkspaces.length && (
								<>
									<p className="sticky text-muted-foreground">
										Private
									</p>
									<hr />
									{privateWorkspaces.map((value) => (
										<SelectedWorkspace
											key={value.id}
											workspace={value}
											onClick={handleSelectWorkspace}
										/>
									))}
								</>
							)}
						</div>
						<div className="!p-2">
							{!!sharedWorkspaces.length && (
								<>
									<p className="sticky text-muted-foreground">
										Shared
									</p>
									<hr />
									{sharedWorkspaces.map((value) => (
										<SelectedWorkspace
											key={value.id}
											workspace={value}
											onClick={handleSelectWorkspace}
										/>
									))}
								</>
							)}
						</div>
						<div className="!p-2">
							{!!collaboratingWorkspaces.length && (
								<>
									<p className="sticky text-muted-foreground">
										Collaborating
									</p>
									<hr />
									{collaboratingWorkspaces.map((value) => (
										<SelectedWorkspace
											key={value.id}
											workspace={value}
											onClick={handleSelectWorkspace}
										/>
									))}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WorkspaceDropdown;
