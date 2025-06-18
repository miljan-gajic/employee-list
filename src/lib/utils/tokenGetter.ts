import { authStore } from '$lib/stores/auth';
import type { StoreAuth } from '$lib/types/auth';

export function initializeAuthStore() {
	const cookies = document.cookie.split(';').reduce<StoreAuth>((acc, cookie) => {
		const [key, value] = cookie.trim().split('=') as [keyof StoreAuth, string];
		acc[key] = decodeURIComponent(value) as StoreAuth[keyof StoreAuth];
		return acc;
	}, {} as StoreAuth);

	authStore.set({
		token: cookies.token || null,
		refreshToken: cookies.refreshToken || null
	});
}
