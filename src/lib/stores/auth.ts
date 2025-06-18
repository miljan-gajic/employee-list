import { writable } from 'svelte/store';

export const authStore = writable<{
	token: string | null;
	refreshToken: string | null;
	username: string | null;
	expiresIn: number | null;
}>({
	token: null,
	refreshToken: null,
	username: null,
	expiresIn: null
});
