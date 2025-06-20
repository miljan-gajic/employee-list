import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST, GET, OPTIONS } from '../bulk-import/+server';
import * as employeesApi from '$lib/api/employees';
import type { RequestEvent } from '@sveltejs/kit';

// Mock the API functions
vi.mock('$lib/api/employees', () => ({
	bulkImportEmployees: vi.fn(),
	bulkImportStatus: vi.fn()
}));

// Mock svelte/store get function
vi.mock('svelte/store', () => ({
	get: vi.fn().mockReturnValue('job-123'),
	writable: vi.fn()
}));

describe('Bulk Import API Endpoints', () => {
	const mockEmployees = [
		{
			active: true,
			firstName: 'John',
			lastName: 'Doe',
			language: 'en'
		}
	];

	const mockToken = 'test-token';
	const mockJobId = 'job-123';
	const mockResponse = { id: mockJobId, href: '/some/url' };
	const mockStatusResponse = { status: 'COMPLETED', processed: 10, errors: 0 };

	// Request and cookies mocks
	let mockRequest: { json: () => Promise<{ employees: typeof mockEmployees }> };
	let mockCookies: { get: (name: string) => string | undefined };
	let mockRequestEvent: Partial<RequestEvent>;

	beforeEach(() => {
		vi.clearAllMocks();

		// Setup request mock
		mockRequest = {
			json: vi.fn().mockResolvedValue({ employees: mockEmployees })
		};

		// Setup cookies mock
		mockCookies = {
			get: vi.fn().mockReturnValue(mockToken)
		};

		// Setup request event mock
		mockRequestEvent = {
			request: mockRequest as unknown as Request,
			cookies: mockCookies as unknown as RequestEvent['cookies']
		};

		// Mock implementation of bulkImportEmployees
		vi.mocked(employeesApi.bulkImportEmployees).mockResolvedValue(mockResponse);

		// Mock implementation of bulkImportStatus
		vi.mocked(employeesApi.bulkImportStatus).mockResolvedValue(mockStatusResponse);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe('POST endpoint', () => {
		it('should call bulkImportEmployees with correct parameters', async () => {
			const response = await POST(mockRequestEvent as RequestEvent);
			const responseBody = await response.json();

			expect(mockRequest.json).toHaveBeenCalled();
			expect(mockCookies.get).toHaveBeenCalledWith('token');
			expect(employeesApi.bulkImportEmployees).toHaveBeenCalledWith(mockEmployees, mockToken);
			expect(response.status).toBe(201);
			expect(responseBody).toEqual({ buldImport: mockResponse });
		});

		it('should return 500 when bulkImportEmployees throws an error', async () => {
			vi.mocked(employeesApi.bulkImportEmployees).mockRejectedValue(new Error('API error'));

			const response = await POST(mockRequestEvent as RequestEvent);
			const responseText = await response.text();

			expect(response.status).toBe(500);
			expect(responseText).toBe('Internal Server Error');
		});
	});

	describe('GET endpoint', () => {
		it('should return successful response with status data', async () => {
			const response = await GET(mockRequestEvent as RequestEvent);
			const responseBody = await response.json();

			expect(mockCookies.get).toHaveBeenCalledWith('token');
			expect(response.status).toBe(200);
			expect(responseBody).toEqual({ data: mockStatusResponse });
		});

		it('should return 500 when bulkImportStatus throws an error', async () => {
			vi.mocked(employeesApi.bulkImportStatus).mockRejectedValue(new Error('API error'));

			const response = await GET(mockRequestEvent as RequestEvent);
			const responseText = await response.text();

			expect(response.status).toBe(500);
			expect(responseText).toBe('Internal Server Error');
		});
	});

	describe('OPTIONS endpoint', () => {
		it('should return CORS headers', async () => {
			const response = await OPTIONS(mockRequestEvent as RequestEvent);

			expect(response.status).toBe(200);
			expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
			expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
			expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
		});
	});
});
