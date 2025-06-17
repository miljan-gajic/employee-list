const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
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
