import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { useGetSession } from "../hooks/auth-hooks";

const HeaderActionButtons = () => {
	const {
		data: { session },
		loading,
	} = useGetSession();
	return (
		<>
			{session ? (
				<Link
					href={"/dashboard"}
					className={buttonVariants({ size: "sm" })}
				>
					Dashboard
				</Link>
			) : loading ? (
				<>
					<div
						className={buttonVariants({
							size: "sm",
							className: "!h-8 !min-w-20 animate-pulse !bg-muted",
						})}
					/>
					<div
						className={buttonVariants({
							size: "sm",
							className: "!h-8 !min-w-20 animate-pulse !bg-muted",
						})}
					/>
				</>
			) : (
				<>
					<Link
						href={"/login"}
						className={buttonVariants({ variant: "outline" })}
					>
						Login{" "}
					</Link>
					<Link href={"/sign-up "} className={buttonVariants()}>
						Sign Up{" "}
					</Link>
				</>
			)}
		</>
	);
};

export default HeaderActionButtons;
