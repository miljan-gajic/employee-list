import type { RequestHandler } from '@sveltejs/kit';
import { logout } from '$lib/api/auth';

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const refreshToken = cookies.get('refreshToken');
		await logout(refreshToken);

		cookies.delete('token', { path: '/' });

		cookies.delete('refreshToken', { path: '/' });

		return new Response(null, {
			status: 204,
			headers: {
				Location: '/login'
			}
		});
	} catch (err) {
		return new Response(JSON.stringify({ message: (err as Error).message || 'Sign out failed' }), {
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
