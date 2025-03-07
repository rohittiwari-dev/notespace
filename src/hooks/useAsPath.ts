import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useAsPath() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	return useMemo(
		() => `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`,
		[pathname, searchParams],
	);
}
