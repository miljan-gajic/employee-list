import { getEmployeesList } from '$lib/api/employees';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = cookies.get('token');
	const limit = url.searchParams.get('limit') || 50;
	const offset = url.searchParams.get('offset') || 0;
	try {
		const data = await getEmployeesList(+offset, +limit, token);

		return new Response(JSON.stringify({ data }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response('Internal Server Error', { status: 500 });
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
