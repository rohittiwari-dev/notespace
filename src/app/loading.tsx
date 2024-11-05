import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<Loader2 className="h-10 w-10 animate-spin text-brand-primaryPurple" />
		</main>
	);
};

export default Loading;
