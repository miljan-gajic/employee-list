import { formatDate } from '../dateTime';
import { describe, it, expect } from 'vitest';

describe('dateTime utils', () => {
	describe('formatDate', () => {
		it('should format date with default format', () => {
			const result = formatDate('2023-12-25');
			expect(result).toBe('December 25, 2023');
		});

		it('should format date with custom format', () => {
			const result = formatDate('2023-12-25', 'MM/DD/YYYY');
			expect(result).toBe('12/25/2023');
		});

		it('should format date with custom format - short format', () => {
			const result = formatDate('2023-12-25', 'MMM D, YY');
			expect(result).toBe('Dec 25, 23');
		});

		it('should format date with input format specified', () => {
			const result = formatDate('25-12-2023', 'MMMM D, YYYY', 'DD-MM-YYYY');
			expect(result).toBe('December 25, 2023');
		});

		it('should format date with custom input and output formats', () => {
			const result = formatDate('12/25/23', 'YYYY-MM-DD', 'MM/DD/YY');
			expect(result).toBe('2023-12-25');
		});

		it('should handle ISO date strings', () => {
			const result = formatDate('2023-12-25T10:30:00Z', 'MMMM D, YYYY');
			expect(result).toBe('December 25, 2023');
		});

		it('should handle different year formats', () => {
			const result = formatDate('2023-12-25', 'YY');
			expect(result).toBe('23');
		});

		it('should handle time formats', () => {
			const result = formatDate('2023-12-25T14:30:00', 'MMMM D, YYYY h:mm A');
			expect(result).toBe('December 25, 2023 2:30 PM');
		});

		it('should handle edge case with February 29th leap year', () => {
			const result = formatDate('2024-02-29', 'MMMM D, YYYY');
			expect(result).toBe('February 29, 2024');
		});

		it('should handle single digit dates and months', () => {
			const result = formatDate('2023-01-05', 'M/D/YYYY');
			expect(result).toBe('1/5/2023');
		});

		it('should handle padded vs unpadded formats', () => {
			const result = formatDate('2023-01-05', 'MM/DD/YYYY');
			expect(result).toBe('01/05/2023');
		});

		it('should handle complex custom input format', () => {
			const result = formatDate('Dec 25, 2023', 'YYYY-MM-DD', 'MMM DD, YYYY');
			expect(result).toBe('2023-12-25');
		});

		it('should handle timestamp input format', () => {
			const result = formatDate('20231225', 'MMMM D, YYYY', 'YYYYMMDD');
			expect(result).toBe('December 25, 2023');
		});

		it('should handle various separator formats', () => {
			const result = formatDate('2023.12.25', 'MM-DD-YYYY', 'YYYY.MM.DD');
			expect(result).toBe('12-25-2023');
		});
	});
});
