import TitleSection from "@/components/title-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeaderImage from "@/assets/headerImage.png";
import CalendarImage from "@/assets/CalendarImage.png";
import TestimonialSection from "@/components/home-components/testimonial-section";
import PricingCard from "@/components/home-components/pricing-card";

const SiteHomePage = () => {
	return (
		<section className={"w-full pb-6"}>
			<div
				className="
				overflow-hidden
				px-4
				sm:px-6
				mt-16
				flex
				flex-col
				gap-4
				md:justify-center
				md:item-center"
			>
				<TitleSection
					heading={
						"Collaborative Experience  in Documenting and Note Making"
					}
					pill={"✨ Personalized Workspace"}
					pillVariant={"SQUARICLE"}
				/>

				<div
					className={
						"bg-white cursor-pointer md:mx-auto mt-2 rounded-xl p-[2px] sm:max-w-[300px] bg-gradient-to-r from-primary to-brand-primaryBlue flex justify-center items-center"
					}
				>
					<Button
						className={"w-full text-2xl rounded-xl p-6"}
						variant={"btn-secondary"}
					>
						Get NoteSpace
					</Button>
				</div>
				<div className={"w-full relative"}>
					<div
						className={
							"w-[86%] z-[3] pointer-events-none left-1/2 -translate-x-1/2 blur-[65px] -top-[5rem] h-[10vh] rounded-full opacity-40 bg-primary absolute"
						}
					/>
					<div
						className={
							"w-[86%] -z-1 left-1/2 -translate-x-1/2 blur-[60px] -top-[1rem] h-[8vh]  rounded-full opacity-80 bg-primary absolute"
						}
					/>
					<Image
						src={HeaderImage}
						className={"w-full z-[1]"}
						alt={"Header Image"}
					/>
					<div
						className={
							"absolute bottom-0 w-full h-[10vh] from-[12%] z-10 bg-gradient-to-t from-brand-dark to-transparent"
						}
					/>
				</div>
			</div>
			<div
				className="
				overflow-hidden
				px-4
				sm:px-6
				mt-24
				flex
				flex-col
				gap-4
				md:justify-center
				md:item-center"
			>
				<div className={"z-[1]"}>
					<TitleSection
						heading={
							"Keep Documentation and Notes All In One Place"
						}
						pill={"Feature"}
						subheading="Capture Your Idea, Thoughts, Meeting Notes, Code Notes or Student Notes in Structured and Organized Manner"
						pillVariant={"SQUARICLE"}
					/>
				</div>

				<div className={"w-2/3 sm:1/2 mx-auto relative"}>
					<div
						className={
							"w-[86%] z-[3] pointer-events-none left-1/2 -translate-x-1/2 blur-[65px] -top-[2rem] h-[10vh] rounded-full opacity-40 bg-primary absolute"
						}
					/>
					<div
						className={
							"w-[86%] -z-1 left-1/2 -translate-x-1/2 blur-[60px] -top-[2rem] h-[8vh]  rounded-full opacity-80 bg-primary absolute"
						}
					/>
					<Image
						src={CalendarImage}
						className={"w-full z-[1]"}
						alt={"Header Image"}
					/>
					<div
						className={
							"absolute bottom-0 w-full h-[10vh] from-[12%] z-10 bg-gradient-to-t from-brand-dark to-transparent"
						}
					/>
				</div>
			</div>
			<div className="relative flex flex-col md:justify-center gap-4 md:item-center mt-24 px-4 sm:px-6 w-full h-full overflow-hidden">
				<div className={"z-[1]"}>
					<TitleSection
						heading={"Trusted By All"}
						pill={"Testimonial"}
						subheading="Join Our Satisfied Users who really enjoys there productivity and experience they get from our Application.   "
						pillVariant={"SQUARICLE"}
					/>
				</div>
				<div className={"w-full p-1 flex-1 h-full mx-auto relative"}>
					<div
						className={
							"w-[86%] z-[3] left-1/2 -translate-x-1/2 blur-[60px] -top-0 h-[8vh]  rounded-full opacity-80 bg-primary absolute"
						}
					/>
					<TestimonialSection />
				</div>
			</div>
			<div
				className="
				overflow-hidden
				px-4
				sm:px-6
				mt-24
				flex
				flex-col
				gap-4
				md:justify-center
				relative
				md:item-center"
			>
				<div className={"z-[1]"}>
					<TitleSection
						heading={"Choose the Perfect Plan for You"}
						pill={"Get Access"}
						subheading="Experience all the benefits of our platform starting at just $9.99 per month"
						pillVariant={"SQUARICLE"}
					/>
				</div>
				<div
					className={
						"w-full z-0 flex gap-8 p-1 pb-16 mx-auto relative"
					}
				>
					<div
						className={
							"w-[400px] -z-10 h-[400px]  right-48 blur-[60px] -top-10 rounded-full opacity-35 bg-primary absolute"
						}
					/>
					<div className="flex sm:flex-row flex-col justify-center items-center gap-20 mx-auto mt-2">
						<PricingCard />
						<PricingCard variant={"PAID"} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default SiteHomePage;
