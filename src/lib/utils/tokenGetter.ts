import { browser } from '$app/environment';

export function getCookie(name: string): string | undefined {
	if (!browser) return 'no browser';

	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [key, value] = cookie.trim().split('=');
		if (key === name) {
			return decodeURIComponent(value);
		}
	}
	return undefined;
}
