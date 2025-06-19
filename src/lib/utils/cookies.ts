import { parse } from 'cookie';
import { serialize } from 'cookie';

export type CookieOptions = {
	path?: string;
	domain?: string;
	maxAge?: number;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
};

/**
 * Reads a cookie by name. Works on both client and server.
 * @param name - The name of the cookie to read.
 * @param request - The server-side request object (optional, required on the server).
 * @returns The cookie value or `undefined` if not found.
 */
export function getCookie(name: string, request?: Request): string | undefined {
	if (typeof document !== 'undefined') {
		// Client-side
		const cookies = parse(document.cookie || '');
		return cookies[name];
	} else if (request) {
		// Server-side
		const cookies = parse(request.headers.get('cookie') || '');
		return cookies[name];
	}
	return undefined;
}

/**
 * Sets a cookie. Works on both client and server.
 * @param name - The name of the cookie to set.
 * @param value - The value of the cookie.
 * @param options - Additional cookie options.
 * @param response - The server-side response object (optional, required on the server).
 */
export function setCookie(
	name: string,
	value: string,
	options: CookieOptions = {},
	response?: Response
): void {
	const serializedCookie = serialize(name, value, options);

	if (typeof document !== 'undefined') {
		// Client-side
		document.cookie = serializedCookie;
	} else if (response) {
		// Server-side
		response.headers.append('Set-Cookie', serializedCookie);
	} else {
		throw new Error('setCookie: Response object is required on the server.');
	}
}

/**
 * Deletes a cookie by name. Works on both client and server.
 * @param name - The name of the cookie to delete.
 * @param options - Additional cookie options (e.g., path, domain).
 * @param response - The server-side response object (optional, required on the server).
 */
export function deleteCookie(name: string, options: CookieOptions = {}, response?: Response): void {
	setCookie(name, '', { ...options, maxAge: 0 }, response);
}
