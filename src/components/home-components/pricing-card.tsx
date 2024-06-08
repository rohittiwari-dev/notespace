import { Check } from "lucide-react";
import { H4, H5, P } from "../app-ui/typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Diamond, Wallet } from "../icons";

interface IPricingCard {
	variant?: "PAID" | "UNPAID";
	label?: string;
	amount?: number;
	description?: string;
}

const PricingCard: React.FC<IPricingCard> = ({
	variant = "UNPAID",
	label,
	amount,
	description,
}) => {
	return (
		<Card className="relative border-washed-purple-800 bg-brand-dark/20 backdrop:blur py-7 p-6 rounded-[10px] min-w-[253px]">
			{variant == "PAID" ? (
				<Wallet className="right-4 absolute" />
			) : (
				<Diamond className="right-4 absolute" />
			)}
			<H4 className="mb-2 w-full">
				{label || variant == "PAID" ? "Plan" : "Free Plan"}
			</H4>
			<div>
				<H5 className="text-Neutrals/neutrals-6">
					$ {amount || variant == "PAID" ? "9.99" : "0"} /m
				</H5>
				<P className="font-normal text-[13px] text-Neutrals/neutrals-8">
					{description || "Limited block trails for teams"}
				</P>
				<Button className="my-3 w-full">Get Started</Button>
			</div>
			<div className="mt-3 text-[13px]">
				<p>
					{variant == "PAID"
						? "Everything in free + "
						: "Here's what you get "}
				</p>
				<ul className="space-y-1.5 mt-2">
					<li className="flex items-center gap-2">
						<Check className="w-[14px] h-[15px]" />{" "}
						{variant == "UNPAID"
							? "3 Blocks for Teams"
							: "Unlimited Blocks for Teams"}
					</li>
					<li className="flex items-center gap-2">
						<Check className="w-[14px] h-[15px]" /> Unlimited File
						Upload
					</li>
					<li className="flex items-center gap-2">
						<Check className="w-[14px] h-[15px]" /> 30 Day page
						History
					</li>
					<li className="flex items-center gap-2">
						<Check className="w-[14px] h-[15px]" /> Invite 10 Member
					</li>
				</ul>
			</div>
		</Card>
	);
};

export default PricingCard;
