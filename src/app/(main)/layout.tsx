import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const HomeLayout = () => {
	return (
		<main className="flex h-full w-full">
			<div className="min-w-[250px] bg-Neutrals/neutrals-12 p-4">
				<Sidebar />
			</div>
			<section className="flex-1 p-4">Body</section>
		</main>
	);
};

export default HomeLayout;
