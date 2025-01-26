import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card, CardHeader, CardContent } from "../ui/card";
import { TextQuote } from "lucide-react";

type TTestimonialCards = {
	className?: string;
};

const TestimonialCards: React.FC<TTestimonialCards> = ({ className }) => {
	return (
		<Card
			className={cn(
				"border-primary-700/80 w-full !max-w-[370px] !min-w-[250px] bg-transparent !bg-gradient-to-t from-indigo-900/20 to-violet-900/20 to-[74%] backdrop-blur-3xl select-none",
				className,
			)}
		>
			<CardHeader className="p-3">
				<div className="flex items-center gap-2">
					<Avatar className="ring-1 ring-indigo-800/90">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<h1 className="text-primary-100 text-[16px]">Name</h1>
						<p className="text-secondary-100 text-[16px] italic">
							@rohittiwari
						</p>
					</div>
					<TextQuote className="text-primary-300 rotate-180" />
				</div>
			</CardHeader>
			<CardContent className="text-primary-200">
				<q>
					Finally found the perfect real-time lightning-fast
					synchronization, intuitive interface, and collaborative
					prowess have elevated my note-taking game.
				</q>
			</CardContent>
		</Card>
	);
};

export default TestimonialCards;
