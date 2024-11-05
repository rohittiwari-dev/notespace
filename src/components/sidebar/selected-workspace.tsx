import { Workspace } from "@/lib/supabase/superbase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FC, useEffect, useState } from "react";
import logo from "@/assets/Logo Small.png";
import Link from "next/link";
import Image from "next/image";

interface ISelectedWorkspaceOption {
	workspace: Workspace;
	onClick?: (option: Workspace) => void;
}

const SelectedWorkspace: FC<ISelectedWorkspaceOption> = ({
	workspace,
	onClick,
}) => {
	const supabase = createClientComponentClient();
	const [workspaceLogo, setWorkspaceLogo] = useState(logo.src);

	useEffect(() => {
		if (workspace.logo) {
			const path = supabase.storage
				.from("workspace-logos")
				.getPublicUrl(workspace.logo)?.data?.publicUrl;
			if (path) setWorkspaceLogo(path);
		}
	}, [supabase, workspace]);

	return (
		<Link
			href={`/dashboard/${workspace.id}`}
			onClick={() => {
				if (onClick) onClick(workspace);
			}}
			className="my-2 flex w-full cursor-pointer flex-row items-center justify-center gap-4 rounded-md p-2 transition-all hover:bg-muted"
		>
			<Image
				src={workspaceLogo}
				alt="workspaceLogo"
				width={26}
				height={26}
				objectFit="cover"
			/>
			<div className="flex flex-col">
				<p className="w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
					{workspace.title}
				</p>
			</div>
		</Link>
	);
};

export default SelectedWorkspace;
