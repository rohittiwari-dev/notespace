import Footer from "@/components/Footer";
import Header from "@/components/headers/Header";
import React from "react";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="z-0 bg-custom-radial bg-40">
			<section className={"z-10 mx-auto max-w-screen-xl"}>
				<Header />
				{children}
			</section>
			<div className="z-10 flex w-full items-center justify-center p-8 px-12 pb-12">
				<Footer />
			</div>
		</main>
	);
};

export default HomePageLayout;
