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
			<div className="md:item-center mt-16 flex flex-col gap-4 overflow-hidden px-4 sm:px-6 md:justify-center">
				<TitleSection
					heading={
						"Collaborative Experience  in Documenting and Note Making"
					}
					pill={"✨ Personalized Workspace"}
					pillVariant={"SQUARICLE"}
				/>

				<div
					className={
						"mt-2 flex cursor-pointer items-center justify-center rounded-xl bg-white bg-gradient-to-r from-primary to-brand-primaryBlue p-[2px] sm:max-w-[300px] md:mx-auto"
					}
				>
					<Button
						className={"w-full rounded-xl p-6 text-2xl"}
						variant={"btn-secondary"}
					>
						Get NoteSpace
					</Button>
				</div>
				<div className={"relative w-full"}>
					<div
						className={
							"pointer-events-none absolute -top-[5rem] left-1/2 z-[3] h-[10vh] w-[86%] -translate-x-1/2 rounded-full bg-primary opacity-40 blur-[65px]"
						}
					/>
					<div
						className={
							"-z-1 absolute -top-[1rem] left-1/2 h-[8vh] w-[86%] -translate-x-1/2 rounded-full bg-primary opacity-80 blur-[60px]"
						}
					/>
					<Image
						src={HeaderImage}
						className={"z-[1] w-full"}
						alt={"Header Image"}
					/>
					<div
						className={
							"absolute bottom-0 z-10 h-[10vh] w-full bg-gradient-to-t from-brand-dark from-[12%] to-transparent"
						}
					/>
				</div>
			</div>
			<div className="md:item-center mt-24 flex flex-col gap-4 overflow-hidden px-4 sm:px-6 md:justify-center">
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

				<div className={"sm:1/2 relative mx-auto w-2/3"}>
					<div
						className={
							"pointer-events-none absolute -top-[2rem] left-1/2 z-[3] h-[10vh] w-[86%] -translate-x-1/2 rounded-full bg-primary opacity-40 blur-[65px]"
						}
					/>
					<div
						className={
							"-z-1 absolute -top-[2rem] left-1/2 h-[8vh] w-[86%] -translate-x-1/2 rounded-full bg-primary opacity-80 blur-[60px]"
						}
					/>
					<Image
						src={CalendarImage}
						className={"z-[1] w-full"}
						alt={"Header Image"}
					/>
					<div
						className={
							"absolute bottom-0 z-10 h-[10vh] w-full bg-gradient-to-t from-brand-dark from-[12%] to-transparent"
						}
					/>
				</div>
			</div>
			<div className="md:item-center relative mt-24 flex h-full w-full flex-col gap-4 overflow-hidden px-4 sm:px-6 md:justify-center">
				<div className={"z-[1]"}>
					<TitleSection
						heading={"Trusted By All"}
						pill={"Testimonial"}
						subheading="Join Our Satisfied Users who really enjoys there productivity and experience they get from our Application.   "
						pillVariant={"SQUARICLE"}
					/>
				</div>
				<div className={"relative mx-auto h-full w-full flex-1 p-1"}>
					<div
						className={
							"absolute -top-0 left-1/2 z-[3] h-[8vh] w-[86%] -translate-x-1/2 rounded-full bg-primary opacity-80 blur-[60px]"
						}
					/>
					<TestimonialSection />
				</div>
			</div>
			<div className="md:item-center relative mt-24 flex flex-col gap-4 overflow-hidden px-4 sm:px-6 md:justify-center">
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
						"relative z-0 mx-auto flex w-full gap-8 p-1 pb-16"
					}
				>
					<div
						className={
							"absolute -top-10 right-48 -z-10 h-[400px] w-[400px] rounded-full bg-primary opacity-35 blur-[60px]"
						}
					/>
					<div className="mx-auto mt-2 flex flex-col items-center justify-center gap-20 sm:flex-row">
						<PricingCard />
						<PricingCard variant={"PAID"} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default SiteHomePage;
