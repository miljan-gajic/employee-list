import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (event.url.pathname === '/api/auth/login') {
		return resolve(event);
	}
	if (!token && event.url.pathname !== '/login') {
		throw redirect(302, '/login');
	}

	if (token && event.url.pathname === '/login') {
		throw redirect(302, '/');
	}

	return resolve(event);
};
