import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const HomeLayout = () => {
	return (
		<main className="flex w-full h-full">
			<div className="bg-Neutrals/neutrals-12 p-4 min-w-[250px]">
				<Sidebar />
			</div>
			<section className="flex-1 p-4">Body</section>
		</main>
	);
};

export default HomeLayout;
