import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card, CardHeader, CardContent } from "../ui/card";

type TTestimonialCards = {
	className?: string;
};

const TestimonialCards: React.FC<TTestimonialCards> = ({ className }) => {
	return (
		<Card
			className={cn(
				"!bg-gradient-to-t from-[#110023] to-[#001439] to-[74%] w-full !min-w-[250px] !max-w-[370px] select-none",
				className,
			)}
		>
			<CardHeader className="p-3">
				<div className="flex items-center gap-2">
					<Avatar className="ring-1 ring-washed-blue-500">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-[16px] text-washed-blue-100">
							Name
						</h1>
						<p className="text-[16px] text-washed-purple-600 italic">
							@rohittiwari
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="text-washed-purple-600">
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
