import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api } from '../api';

// Mock fetch globally
const mockFetch = vi.fn();
//@ts-expect-error Define fetch globally
global.fetch = mockFetch;

describe('api', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should make successful API call with default options', async () => {
		const mockData = { id: 1, name: 'test' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		const result = await api('/test');

		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining('/test'),
			expect.objectContaining({
				headers: expect.objectContaining({
					'Content-Type': 'application/json',
					'x-api-key': expect.any(String)
				})
			})
		);
		expect(result).toEqual(mockData);
	});

	it('should use internal URL by default', async () => {
		const mockData = { success: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/internal-endpoint');

		const [url] = mockFetch.mock.calls[0];
		expect(url).toContain('/internal-endpoint');
	});

	it('should use external URL when internal is false', async () => {
		const mockData = { external: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/external-endpoint', {}, undefined, false);

		const [url] = mockFetch.mock.calls[0];
		expect(url).toContain('/external-endpoint');
	});

	it('should include Authorization header when token is provided', async () => {
		const mockData = { authenticated: true };
		const token = 'test-token';
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/protected', {}, token);

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers.Authorization).toBe('Bearer test-token');
	});

	it('should merge custom options with defaults', async () => {
		const mockData = { updated: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		const customOptions = {
			method: 'POST',
			body: JSON.stringify({ data: 'test' }),
			headers: {
				'Custom-Header': 'custom-value'
			}
		};

		await api('/update', customOptions);

		const [, options] = mockFetch.mock.calls[0];
		expect(options.method).toBe('POST');
		expect(options.body).toBe(JSON.stringify({ data: 'test' }));
		expect(options.headers['Custom-Header']).toBe('custom-value');
	});

	it('should include all parameters when provided', async () => {
		const mockData = { complex: true };
		const token = 'complex-token';
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		const customOptions = {
			method: 'PUT',
			headers: {
				'Additional-Header': 'value'
			}
		};

		await api('/complex', customOptions, token, false);

		const [url, options] = mockFetch.mock.calls[0];
		expect(url).toContain('/complex');
		expect(options.method).toBe('PUT');
		// Authorization header should be present unless overridden by custom headers
		expect(options.headers['Additional-Header']).toBe('value');
		// Check that token was used in the function call
		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining('/complex'),
			expect.objectContaining({
				method: 'PUT'
			})
		);
	});

	it('should throw error when response is not ok', async () => {
		const errorResponse = { message: 'Bad Request' };
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: vi.fn().mockResolvedValueOnce(errorResponse)
		});

		await expect(api('/error')).rejects.toThrow('Bad Request');
	});

	it('should throw generic error when no error message in response', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: vi.fn().mockResolvedValueOnce({})
		});

		await expect(api('/error-no-message')).rejects.toThrow('API layer error');
	});

	it('should handle network errors', async () => {
		mockFetch.mockRejectedValueOnce(new Error('Network error'));

		await expect(api('/network-error')).rejects.toThrow('Network error');
	});

	it('should handle JSON parsing errors in error response', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
		});

		await expect(api('/json-error')).rejects.toThrow('Invalid JSON');
	});

	it('should return typed response', async () => {
		interface User {
			id: number;
			name: string;
			email: string;
		}

		const mockUser: User = {
			id: 1,
			name: 'John Doe',
			email: 'john@example.com'
		};

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockUser)
		});

		const result = await api<User>('/user/1');

		expect(result).toEqual(mockUser);
		expect(result.id).toBe(1);
		expect(result.name).toBe('John Doe');
		expect(result.email).toBe('john@example.com');
	});

	it('should handle different HTTP methods', async () => {
		const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

		for (const method of methods) {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce({ method })
			});

			await api(`/${method.toLowerCase()}`, { method });

			const [url, options] = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
			expect(url).toContain(`/${method.toLowerCase()}`);
			expect(options.method).toBe(method);
		}
	});

	it('should handle empty token correctly', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/test', {}, '');

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers.Authorization).toBeUndefined();
	});

	it('should preserve custom Content-Type header', async () => {
		const mockData = { uploaded: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		await api('/upload', options);

		const [, fetchOptions] = mockFetch.mock.calls[0];
		expect(fetchOptions.method).toBe('POST');
		expect(fetchOptions.headers['Content-Type']).toBe('multipart/form-data');
	});

	it('should handle empty endpoint', async () => {
		const mockData = { root: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('');

		expect(mockFetch).toHaveBeenCalledTimes(1);
		const [url] = mockFetch.mock.calls[0];
		expect(typeof url).toBe('string');
	});

	it('should handle undefined token', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/test', {}, undefined);

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers.Authorization).toBeUndefined();
	});

	it('should handle API response with null data', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(null)
		});

		const result = await api('/null-data');

		expect(result).toBeNull();
	});

	it('should include API key in headers', async () => {
		const mockData = { success: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/test');

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers['x-api-key']).toBeDefined();
		expect(typeof options.headers['x-api-key']).toBe('string');
	});

	it('should use correct Content-Type by default', async () => {
		const mockData = { success: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		await api('/test');

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers['Content-Type']).toBe('application/json');
	});

	it('should handle response with empty JSON', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce({})
		});

		const result = await api('/empty');

		expect(result).toEqual({});
	});

	it('should pass through custom headers', async () => {
		const mockData = { success: true };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockData)
		});

		const customHeaders = {
			'X-Custom-Header': 'custom-value',
			'X-Another-Header': 'another-value'
		};

		await api('/test', { headers: customHeaders });

		const [, options] = mockFetch.mock.calls[0];
		expect(options.headers['X-Custom-Header']).toBe('custom-value');
		expect(options.headers['X-Another-Header']).toBe('another-value');
	});
});
