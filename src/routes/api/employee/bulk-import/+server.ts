import { bulkImportEmployees, bulkImportStatus } from '$lib/api/employees';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { employees } = await request.json();
	const token = cookies.get('token');
	try {
		const data = await bulkImportEmployees(employees, token);

		cookies.set('jobId', data.id as string, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			httpOnly: false,
			secure: false,
			sameSite: 'lax'
		});

		return new Response(JSON.stringify({ buldImport: data }), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response('Internal Server Error', { status: 500 });
	}
};

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('token');
	const jobId = cookies.get('jobId');
	try {
		const data = await bulkImportStatus(jobId, token);

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
