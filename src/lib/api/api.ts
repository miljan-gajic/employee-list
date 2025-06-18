const EXTERNAL_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const INTERNAL_BASE_URL = import.meta.env.VITE_API_INTERNAL_URL;

export async function api<T>(
	endpoint: string,
	options: RequestInit = {},
	token?: string,
	internal: boolean = true
): Promise<T> {
	const BASE_URL = internal ? INTERNAL_BASE_URL : EXTERNAL_BASE_URL;
	console.log(`API request: ${BASE_URL}${endpoint}`);
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers
		},
		...options
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'API error');
	}

	return response.json() as Promise<T>;
}
