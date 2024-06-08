import Footer from "@/components/Footer";
import Header from "@/components/Header";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="z-0 bg-40 bg-custom-radial">
			<section className={"max-w-screen-xl z-10 mx-auto"}>
				<Header />
				{children}
			</section>
			<div className="z-10 flex justify-center items-center px-12 p-8 pb-12 w-full">
				<Footer />
			</div>
		</main>
	);
};

export default HomePageLayout;
