import type { StoreAuth } from '$lib/types/auth';
import { writable } from 'svelte/store';

export const authStore = writable<StoreAuth>({
	token: null,
	refreshToken: null
});
