import { mapEmployeeResponseToDataSource } from '../mappers';
import type { Employee } from '$lib/types/employee';
import { formatDate } from '../dateTime';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the formatDate function
vi.mock('../dateTime', () => ({
	formatDate: vi.fn((date: string) => `formatted-${date}`)
}));

const mockFormatDate = vi.mocked(formatDate);

describe('mappers', () => {
	describe('mapEmployeeResponseToDataSource', () => {
		beforeEach(() => {
			vi.clearAllMocks();
		});

		const createMockEmployee = (overrides: Partial<Employee> = {}): Employee => ({
			id: '123',
			active: true,
			appCode: 'TEST',
			clientId: 'client-123',
			created: '2023-12-25T10:00:00Z',
			externalId: 'EMP-001 - External ID',
			custom2: null,
			custom3: null,
			employeeKey: null,
			firstDay: '2023-01-01',
			firstName: 'John',
			language: 'en',
			lastName: 'Doe',
			latestReminder: null,
			modified: '2023-12-25T10:00:00Z',
			nextReminder: null,
			personalData: null,
			personalDataModules: null,
			phone: '+1234567890',
			privacyConfirmed: true,
			rollout: false,
			status: 'open',
			...overrides
		});

		it('should map employee data correctly with all fields present', () => {
			const employees = [createMockEmployee()];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				personalNumber: 'emp',
				firstName: 'John',
				lastName: 'Doe',
				active: 'active',
				startDate: 'formatted-2023-12-25T10:00:00Z'
			});
			expect(mockFormatDate).toHaveBeenCalledWith('2023-12-25T10:00:00Z');
		});

		it('should handle inactive employee', () => {
			const employees = [createMockEmployee({ active: false })];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].active).toBe('inactive');
		});

		it('should handle null externalId', () => {
			const employees = [createMockEmployee({ externalId: null })];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].personalNumber).toBe('');
		});

		it('should handle empty externalId', () => {
			const employees = [createMockEmployee({ externalId: '' })];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].personalNumber).toBe('');
		});

		it('should extract personalNumber from externalId correctly', () => {
			const testCases = [
				{ externalId: 'ABC-123 - Description', expected: 'abc' },
				{ externalId: '  EMP-456  - Another Description', expected: 'emp' },
				{ externalId: 'SINGLE-PART', expected: 'single' },
				{ externalId: 'MULTI-PART-WITH-DASHES - Description', expected: 'multi' }
			];

			testCases.forEach(({ externalId, expected }) => {
				const employees = [createMockEmployee({ externalId })];
				const result = mapEmployeeResponseToDataSource(employees);
				expect(result[0].personalNumber).toBe(expected);
			});
		});

		it('should handle externalId without dash separator', () => {
			const employees = [createMockEmployee({ externalId: 'NODASH' })];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].personalNumber).toBe('nodash');
		});

		it('should handle multiple employees', () => {
			const employees = [
				createMockEmployee({
					id: '1',
					firstName: 'John',
					lastName: 'Doe',
					active: true,
					externalId: 'EMP-001 - First Employee',
					created: '2023-01-01'
				}),
				createMockEmployee({
					id: '2',
					firstName: 'Jane',
					lastName: 'Smith',
					active: false,
					externalId: 'EMP-002 - Second Employee',
					created: '2023-02-01'
				})
			];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result).toHaveLength(2);
			expect(result[0]).toEqual({
				personalNumber: 'emp',
				firstName: 'John',
				lastName: 'Doe',
				active: 'active',
				startDate: 'formatted-2023-01-01'
			});
			expect(result[1]).toEqual({
				personalNumber: 'emp',
				firstName: 'Jane',
				lastName: 'Smith',
				active: 'inactive',
				startDate: 'formatted-2023-02-01'
			});
		});

		it('should handle empty employee array', () => {
			const result = mapEmployeeResponseToDataSource([]);

			expect(result).toEqual([]);
			expect(mockFormatDate).not.toHaveBeenCalled();
		});

		it('should call formatDate for each employee', () => {
			const employees = [
				createMockEmployee({ created: '2023-01-01' }),
				createMockEmployee({ created: '2023-02-01' }),
				createMockEmployee({ created: '2023-03-01' })
			];

			mapEmployeeResponseToDataSource(employees);

			expect(mockFormatDate).toHaveBeenCalledTimes(3);
			expect(mockFormatDate).toHaveBeenCalledWith('2023-01-01');
			expect(mockFormatDate).toHaveBeenCalledWith('2023-02-01');
			expect(mockFormatDate).toHaveBeenCalledWith('2023-03-01');
		});

		it('should handle special characters in names', () => {
			const employees = [
				createMockEmployee({
					firstName: 'José',
					lastName: "O'Connor"
				})
			];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].firstName).toBe('José');
			expect(result[0].lastName).toBe("O'Connor");
		});

		it('should handle whitespace in externalId parts', () => {
			const employees = [
				createMockEmployee({
					externalId: '  WHITESPACE-TEST  -  Description with spaces  '
				})
			];

			const result = mapEmployeeResponseToDataSource(employees);

			expect(result[0].personalNumber).toBe('whitespace');
		});
	});
});
