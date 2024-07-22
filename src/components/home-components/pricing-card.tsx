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
		<Card className="relative min-w-[253px] rounded-[10px] border-washed-purple-800 bg-brand-dark/20 p-6 py-7 backdrop:blur">
			{variant == "PAID" ? (
				<Wallet className="absolute right-4" />
			) : (
				<Diamond className="absolute right-4" />
			)}
			<H4 className="mb-2 w-full">
				{label || variant == "PAID" ? "Plan" : "Free Plan"}
			</H4>
			<div>
				<H5 className="text-Neutrals/neutrals-6">
					$ {amount || variant == "PAID" ? "9.99" : "0"} /m
				</H5>
				<P className="text-[13px] font-normal text-Neutrals/neutrals-8">
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
				<ul className="mt-2 space-y-1.5">
					<li className="flex items-center gap-2">
						<Check className="h-[15px] w-[14px]" />{" "}
						{variant == "UNPAID"
							? "3 Blocks for Teams"
							: "Unlimited Blocks for Teams"}
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-[15px] w-[14px]" /> Unlimited File
						Upload
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-[15px] w-[14px]" /> 30 Day page
						History
					</li>
					<li className="flex items-center gap-2">
						<Check className="h-[15px] w-[14px]" /> Invite 10 Member
					</li>
				</ul>
			</div>
		</Card>
	);
};

export default PricingCard;
