type WaitOptions = {
	interval?: number;
	timeout?: number;
};

export const wait = (
	conditionFn: () => boolean,
	{ interval = 50, timeout = 5000 }: WaitOptions = {},
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();

		const checkCondition = () => {
			if (conditionFn()) {
				resolve();
			} else if (Date.now() - startTime >= timeout) {
				reject(
					new Error("Timeout reached while waiting for condition"),
				);
			} else {
				setTimeout(checkCondition, interval);
			}
		};

		checkCondition();
	});
};
