import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/Logo_Full.png';
import { HoverBoarderGradient } from '../primitives/hover-boarder-gradient';
import { Input } from '../ui/input';

function Footer() {
	return (
		<div className="w-full flex justify-center items-center gap-4 mt-10">
			<div>
				<Image src={Logo} alt="full size logo" />

				<HoverBoarderGradient className="w-fit h-fit p-0 border-none bg-background">
					<Input className="focus-visible:!ring-0 !border-none focus-visible:!outline-none" />
				</HoverBoarderGradient>
			</div>
		</div>
	);
}

export default Footer;
