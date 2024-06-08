import Image from "next/image";
import React from "react";
import logoImg from "@/assets/Logo full.png";
import Link from "next/link";
import { P } from "./app-ui/typography";

const Footer = () => {
	return (
		<div className="mx-auto max-w-screen-xl">
			<div className="flex flex-col justify-center sm:justify-start w-full">
				<Link href={"/"} className="mx-auto sm:ml-0 w-fit">
					<Image
						src={logoImg}
						alt={"Logo"}
						width={100}
						height={100}
						priority={true}
						quality={1}
						className="w-[120px] h-auto"
					/>
				</Link>
				<P className="text-center text-washed-purple-800 sm:text-start">
					Organize effortlessly, accomplish seamlessly with{" "}
					<Link href={"/"} className="text-purple-500">
						Notespace
					</Link>
					. Your productivity hub, reimagined for clarity and
					efficiency
				</P>
			</div>
			<div className="flex sm:flex-row flex-col justify-between items-center sm:items-start gap-8 mt-8 text-center text-neutral-400 sm:text-start">
				<div>
					<P className="my-1.5 font-semibold">Product</P>
					<ul className="space-y-1">
						<li>Pricing</li>
						<li>About</li>
						<li>Resources</li>
						<li>Downloads</li>
					</ul>
				</div>
				<div>
					<P className="my-1.5 font-semibold">Product</P>
					<ul className="space-y-1">
						<li>Pricing</li>
						<li>About</li>
						<li>Resources</li>
						<li>Downloads</li>
					</ul>
				</div>
				<div>
					<P className="my-1.5 font-semibold">Product</P>
					<ul className="space-y-1">
						<li>Pricing</li>
						<li>About</li>
						<li>Resources</li>
						<li>Downloads</li>
					</ul>
				</div>
				<ul className="space-y-1">
					<li>Pricing</li>
					<li>About</li>
					<li>Resources</li>
					<li>Downloads</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
