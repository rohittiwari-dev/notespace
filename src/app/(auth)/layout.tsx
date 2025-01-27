import React from "react";

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<main className="bg-background relative z-0 h-full w-full overflow-hidden">
			<div className="absolute -top-30 right-1 -z-10 h-50 w-96 bg-pink-800 opacity-45 bg-blend-multiply blur-[100px]" />
			<div className="absolute -top-30 right-80 -z-10 h-50 w-96 bg-orange-700 opacity-45 bg-blend-multiply blur-[100px]" />
			<div className="absolute -bottom-30 left-1 -z-10 h-50 w-96 bg-purple-700 opacity-45 bg-blend-multiply blur-[100px]" />
			<div className="z-50 h-full w-full overflow-y-auto backdrop-blur-3xl">
				{children}
			</div>
		</main>
	);
};

export default AuthLayout;
