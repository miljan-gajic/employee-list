import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET, OPTIONS } from '../employee-list/+server';
import * as employeesApi from '$lib/api/employees';
import type { RequestEvent } from '@sveltejs/kit';
import type { Employee } from '$lib/types/employee';

// Mock the API functions
vi.mock('$lib/api/employees', () => ({
	getEmployeesList: vi.fn()
}));

describe('Employee List API Endpoints', () => {
	const mockEmployees: Employee[] = [
		{
			id: '1',
			active: true,
			appCode: 'APP001',
			clientId: 'client123',
			created: '2023-01-01T00:00:00Z',
			externalId: 'ext123',
			custom2: 'custom2value',
			custom3: 'custom3value',
			employeeKey: 'emp123',
			firstDay: '2023-01-02T00:00:00Z',
			firstName: 'John',
			language: 'en',
			lastName: 'Doe',
			latestReminder: null,
			modified: '2023-01-03T00:00:00Z',
			nextReminder: null,
			personalData: null,
			personalDataModules: null,
			phone: '123-456-7890',
			privacyConfirmed: true,
			rollout: false,
			status: 'open'
		}
	];

	const mockToken = 'test-token';
	const defaultLimit = 50;
	const defaultOffset = 0;

	// Request and cookies mocks
	let mockUrl: URL;
	let mockCookies: { get: (name: string) => string | undefined };
	let mockRequestEvent: Partial<RequestEvent>;

	beforeEach(() => {
		vi.clearAllMocks();

		// Setup URL mock with search params
		mockUrl = new URL('https://example.com?limit=50&offset=0');

		// Setup cookies mock
		mockCookies = {
			get: vi.fn().mockReturnValue(mockToken)
		};

		// Setup request event mock
		mockRequestEvent = {
			url: mockUrl,
			cookies: mockCookies as unknown as RequestEvent['cookies']
		};

		// Mock implementation of getEmployeesList
		vi.mocked(employeesApi.getEmployeesList).mockResolvedValue(mockEmployees);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe('GET endpoint', () => {
		it('should call getEmployeesList with correct parameters', async () => {
			const response = await GET(mockRequestEvent as RequestEvent);
			const responseBody = await response.json();

			expect(mockCookies.get).toHaveBeenCalledWith('token');
			expect(employeesApi.getEmployeesList).toHaveBeenCalledWith(
				defaultOffset,
				defaultLimit,
				mockToken
			);
			expect(response.status).toBe(200);
			expect(responseBody).toEqual({ data: mockEmployees });
		});

		it('should handle custom limit and offset', async () => {
			const customLimit = 10;
			const customOffset = 5;
			mockUrl.searchParams.set('limit', customLimit.toString());
			mockUrl.searchParams.set('offset', customOffset.toString());

			await GET(mockRequestEvent as RequestEvent);

			expect(employeesApi.getEmployeesList).toHaveBeenCalledWith(
				customOffset,
				customLimit,
				mockToken
			);
		});

		it('should use default limit and offset when not provided', async () => {
			mockUrl.searchParams.delete('limit');
			mockUrl.searchParams.delete('offset');

			await GET(mockRequestEvent as RequestEvent);

			expect(employeesApi.getEmployeesList).toHaveBeenCalledWith(
				defaultOffset,
				defaultLimit,
				mockToken
			);
		});

		it('should return 500 when getEmployeesList throws an error', async () => {
			vi.mocked(employeesApi.getEmployeesList).mockRejectedValue(new Error('API error'));

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
