import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/Logo_Full.png';

import { Label } from '../ui/label';
import { buttonVariants } from '../ui/button';
import { DiscordIcon, GithubIcon } from '../icons';
import Link from 'next/link';
import NewsLetter from '../app-ui/newsletter';

function Footer() {
	return (
		<div className="w-full flex justify-between items-center gap-4 mt-30">
			<div className="flex flex-col gap-4">
				<div>
					<Image src={Logo} alt="full size logo" />
					<p className="text-accent-foreground/60 max-w-[60ch]">
						An all-in-one note-taking and project management app
						designed for students. Capture ideas, collaborate
						effortlessly, and stay organized with powerful
						productivity tools.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<NewsLetter />
					<div className="flex items-center  gap-2">
						<Link
							href="https://github.com/rohittiwari-dev/notespace"
							className="hover:scale-110 transition-all"
						>
							<GithubIcon className="text-foreground" />
						</Link>
						<Link
							href="https://discord.gg/notespace"
							className="hover:scale-110 transition-all"
						>
							<DiscordIcon className="text-foreground" />
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center ">
					<p className="text-accent-foreground/80">Links</p>
					<div className="flex flex-col items-center">
						<Link
							href="/"
							className={buttonVariants({
								size: 'sm',
								variant: 'link',
								className:
									'!py-0 !my-0 !text-primary-400/80 dark:!text-primary-200/80',
							})}
						>
							Home
						</Link>
						<Link
							href="/"
							className={buttonVariants({
								size: 'sm',
								variant: 'link',
								className:
									'!py-0 !my-0 !text-primary-400/80 dark:!text-primary-200/80',
							})}
						>
							About
						</Link>
						<Link
							href="/"
							className={buttonVariants({
								size: 'sm',
								variant: 'link',
								className:
									'!py-0 !my-0 !text-primary-400/80 dark:!text-primary-200/80',
							})}
						>
							Contact
						</Link>
					</div>
				</div>
				<div className="flex flex-col text-center mt-auto gap-2 text-accent-foreground/60">
					<Label>Copyright</Label>
					<p>&copy; 2025 NoteSpace. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
