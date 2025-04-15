import React from 'react';

function CustomSuspense({
	checkValidForData = false,
	children,
	data,
	fallback,
	isLoading = true,
	timeout,
}: {
	fallback: React.ReactNode;
	children: React.ReactNode;
	isLoading?: boolean;
	timeout?: number;
	checkValidForData?: boolean;
	data?:
		| Record<string, any>
		| Array<Record<string, any> | string | number | boolean | unknown>
		| string
		| number
		| boolean;
}) {
	const [timer, setTimer] = React.useState(timeout || 0);
	const [isLoadingState, setIsLoadingState] = React.useState(isLoading);

	const isValidData = React.useMemo(() => {
		if (checkValidForData) {
			if (data) {
				if (typeof data === 'object') {
					return Object.keys(data).length > 0;
				} else if (Array.isArray(data)) {
					return data.length > 0;
				}
			}
			return !!data;
		}
		return true;
	}, [data, checkValidForData]);

	React.useEffect(() => {
		if (typeof isLoading === 'boolean') {
			setIsLoadingState(isLoading);
		}
	}, [isLoading]);

	React.useEffect(() => {
		if (timeout) {
			setTimer(timeout || 0);
		}
	}, [timeout]);

	React.useEffect(() => {
		const localTimeout = setTimeout(
			() => {
				if (!isValidData) {
					setTimer((prev) => prev + 200);
				} else {
					setIsLoadingState(false);
				}
			},
			!isValidData ? 0 : timer || 0,
		);

		return () => clearTimeout(localTimeout);
	}, [isValidData, timer]);

	return isLoadingState || (checkValidForData && !isValidData)
		? fallback
		: children;
}

export default CustomSuspense;
