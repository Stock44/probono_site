export default async function blobToDataUrl(blob: Blob): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			resolve(reader.result as string);
		});
		reader.addEventListener('error', () => {
			reject(new Error(reader.error!.message));
		});

		reader.addEventListener('abort', () => {
			reject(new Error('Read aborted'));
		});
		reader.readAsDataURL(blob);
	});
}
