import type { RequestHandler } from '@sveltejs/kit';
import { api } from '$lib/api/api';
import type { AuthResponse } from '$lib/types/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	try {
		const data = await api<AuthResponse>(
			'/auth/sign-in',
			{
				method: 'POST',
				body: JSON.stringify({ email, password })
			},
			undefined,
			false
		);

		const { token, refreshToken, expiresIn } = data;

		cookies.set('token', token as string, {
			path: '/',
			httpOnly: true,
			secure: true,
			maxAge: expiresIn as number
		});

		cookies.set('refreshToken', refreshToken as string, {
			path: '/',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 90
		});

		return new Response(JSON.stringify({ message: 'Login successful' }), {
			status: 200
		});
	} catch (err) {
		return new Response(JSON.stringify({ message: (err as Error).message || 'Login failed' }), {
			status: 401
		});
	}
};

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*', // Allow all origins (or specify your frontend's origin)
			'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow specific HTTP methods
			'Access-Control-Allow-Headers': 'Content-Type' // Allow specific headers
		}
	});
};
