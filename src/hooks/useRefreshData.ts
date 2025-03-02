import { useRouter } from "next/navigation";

import { useAsPath } from "./useAsPath";

export function useRefreshData() {
	const router = useRouter();
	const asPath = useAsPath();
	return () => {
		if ("refresh" in router) {
			// Refresh the server components
			router.refresh();
		}
		router.replace(asPath);
	};
}
