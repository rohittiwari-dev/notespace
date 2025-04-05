import { useEffect, useState, useCallback, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debouncedValue;
}

export function useDebouncedCallback<T extends any[]>(
	fn: (...args: T) => void,
	delay: number = 500,
) {
	const timeoutRef = useRef<number | null>(null);

	const debouncedCallback = useCallback(
		(...args: T) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				fn(...args);
			}, delay);
		},
		[fn, delay],
	);

	return debouncedCallback;
}
