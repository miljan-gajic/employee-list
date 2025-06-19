import type { AuthResponse } from '$lib/types/auth';
import { api } from './api';

export async function login(email: string, password: string): Promise<AuthResponse> {
	return api<AuthResponse>(
		'/auth/sign-in',
		{
			method: 'POST',
			body: JSON.stringify({ email, password })
		},
		undefined,
		false
	);
}

export async function logout(refreshToken?: string): Promise<void> {
	try {
		await api<void>(
			'/auth/sign-out',
			{ method: 'POST', body: JSON.stringify({ refreshToken }) },
			undefined,
			false
		);
	} catch (error) {
		console.error('from api layer', error);
	}
}
