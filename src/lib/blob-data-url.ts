export default async function blobToDataUrl(blob: Blob): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', event => {
			resolve(reader.result as string);
		});
		reader.addEventListener('error', event => {
			reject(reader.error);
		});

		reader.addEventListener('abort', event => {
			reject(new Error('Read aborted'));
		});
		reader.readAsDataURL(blob);
	});
}

export function dataUrlToBlob(dataUrl: string) {
	const array = dataUrl.split(',');
	if (array.length !== 2) {
		throw new Error('invalid dataUrl');
	}

	const initial = (/:(.*?);/.exec(array[0]));
	if (initial === null) {
		throw new Error('invalid dataUrl');
	}

	const mime = initial[1];
	const bstr = atob(array[1]);
	let n = bstr.length;
	const u8array = new Uint8Array(n);
	while (n--) {
		const codePoint = bstr.codePointAt(n);
		if (codePoint === undefined) {
			throw new Error('invalid dataUrl');
		}

		u8array[n] = codePoint;
	}

	return new Blob([u8array], {type: mime});
}

