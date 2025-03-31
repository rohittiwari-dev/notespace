export const localStorage = {
	getItem(key: string) {
		try {
			return window.localStorage.getItem(key);
		} catch {
			// In case storage is restricted. Possible reasons
			// 1. Third Party Context in Chrome Incognito mode.
			return null;
		}
	},
	setItem(key: string, value: string) {
		try {
			window.localStorage.setItem(key, value);
		} catch {
			// In case storage is restricted. Possible reasons
			// 1. Third Party Context in Chrome Incognito mode.
			// 2. Storage limit reached
			return;
		}
	},
	removeItem: (key: string) => {
		try {
			window.localStorage.removeItem(key);
		} catch {
			return;
		}
	},
};
