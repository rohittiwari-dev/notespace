export function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			// Remove the prefix (e.g., "data:image/jpeg;base64,")
			const base64String = (reader.result as string).split(',')[1];
			resolve(base64String);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
