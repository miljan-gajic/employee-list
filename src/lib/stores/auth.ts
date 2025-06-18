import type { AuthResponse } from '$lib/types/auth';
import { writable } from 'svelte/store';

export const authStore = writable<AuthResponse>({
	token: null,
	refreshToken: null,
	username: null,
	expiresIn: null,
	clientId: null,
	tokenType: null
});
