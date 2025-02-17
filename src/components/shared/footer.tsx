import { constants } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import smallLogo from "@/assets/Logo Small.png";

const footerLinkSections = [
	{
		section: "GENERAL",
		links: [
			{
				title: "Blog",
				url: "/blog",
			},
			{
				title: "Contribute",
				url: constants.github_repo,
			},
		],
	},
	{
		section: "SOCIAL",
		links: [
			{
				title: "Twitter",
				url: constants.twitter,
			},
			{
				title: "Discord",
				url: constants.discord,
			},
		],
	},
	{
		section: "LEGAL",
		links: [
			{
				title: "Terms of Service",
				url: "/tos",
			},
			{
				title: "Privacy Policy",
				url: "/privacy",
			},
		],
	},
];

export const Footer = () => {
	return (
		<footer className="border-secondary-400/40 dark:border-secondary-500/70 mt-30 border-t py-12 lg:py-16">
			<div className="container-main flex flex-col justify-between md:flex-row">
				<div className="order-2 space-y-4 md:order-1">
					<Link
						href="/"
						className="text-primary-400 dark:text-primary-100 flex items-center gap-3 font-semibold"
					>
						<Image
							src={smallLogo}
							width={24}
							height={24}
							alt="Noodle Logo"
						/>
						<span>{constants.shortName}</span>
					</Link>
					<p className="text-sm text-slate-900/80 dark:text-slate-300">
						&copy; {new Date().getFullYear()} {constants.shortName}{" "}
						LTD. All Rights Reserved.
					</p>
				</div>
				<div className="order-1 mb-10 grid grid-cols-3 gap-0 md:order-2 md:mb-0 md:gap-12">
					{footerLinkSections.map(({ section, links }) => (
						<div className="text-sm" key={section}>
							<h3 className="text-semibold pb-4 text-slate-900 dark:text-slate-300">
								{section}
							</h3>
							<ul className="text-medium flex flex-col gap-2 text-slate-900/80 dark:text-gray-300">
								{links.map(({ title, url }) => (
									<li key={title}>
										{url.startsWith("/") ? (
											<Link href={url}>{title}</Link>
										) : (
											<a
												href={url}
												target="_blank"
												rel="noreferrer noopener"
											>
												{title}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
};
