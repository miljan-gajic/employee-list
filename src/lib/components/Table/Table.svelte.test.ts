import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Table from './Table.svelte';
import type { MappedEmployeeDataSource } from '$lib/types/employee';

describe('Table', () => {
	const mockData: MappedEmployeeDataSource[] = [
		{
			personalNumber: 'emp001',
			firstName: 'John',
			lastName: 'Doe',
			active: 'active',
			startDate: '2023-01-01'
		},
		{
			personalNumber: 'emp002',
			firstName: 'Jane',
			lastName: 'Smith',
			active: 'inactive',
			startDate: '2023-02-01'
		}
	];

	const mockHandleScroll = vi.fn();

	it('should render with default props', () => {
		const { container } = render(Table, {
			props: {
				handleScroll: mockHandleScroll
			}
		});

		const tableContainer = container.querySelector('.data-table-container');
		const tableWrapper = container.querySelector('.table-wrapper');
		const spinner = container.querySelector('.spinner');

		expect(tableContainer).toBeTruthy();
		expect(tableWrapper).toBeTruthy();
		expect(spinner).toBeTruthy(); // Shows spinner when no data
	});

	it('should render data when provided', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const table = container.querySelector('.data-table');
		const tbody = container.querySelector('tbody');
		const rows = container.querySelectorAll('.table-row');

		expect(table).toBeTruthy();
		expect(tbody).toBeTruthy();
		expect(rows).toHaveLength(2);
	});

	it('should render table headers correctly', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const headers = container.querySelectorAll('.table-header');
		expect(headers).toHaveLength(5);
		expect(headers[0].textContent?.trim()).toBe('Personalnummer');
		expect(headers[1].textContent?.trim()).toBe('Vorname');
		expect(headers[2].textContent?.trim()).toBe('Nachname');
		expect(headers[3].textContent?.trim()).toBe('Aktiv');
		expect(headers[4].textContent?.trim()).toBe('Erstellt');
	});

	it('should render table data correctly', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const cells = container.querySelectorAll('.table-cell');
		expect(cells[0].textContent?.trim()).toBe('emp001');
		expect(cells[1].textContent?.trim()).toBe('John');
		expect(cells[2].textContent?.trim()).toBe('Doe');
		expect(cells[4].textContent?.trim()).toBe('2023-01-01');
	});

	it('should show loading spinner when loading is true', () => {
		const { container } = render(Table, {
			props: {
				loading: true,
				data: mockData,
				handleScroll: mockHandleScroll
			}
		});

		const spinner = container.querySelector('.spinner');
		const table = container.querySelector('.data-table');

		expect(spinner).toBeTruthy();
		expect(table).toBeFalsy();
	});

	it('should show spinner when data is empty', () => {
		const { container } = render(Table, {
			props: {
				data: [],
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const spinner = container.querySelector('.spinner');
		const table = container.querySelector('.data-table');

		expect(spinner).toBeTruthy();
		expect(table).toBeFalsy();
	});

	it('should render custom columns when provided', () => {
		const customColumns = [
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' }
		];

		const { container } = render(Table, {
			props: {
				data: mockData,
				columns: customColumns,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const headers = container.querySelectorAll('.table-header');
		expect(headers).toHaveLength(2);
		expect(headers[0].textContent?.trim()).toBe('Name');
		expect(headers[1].textContent?.trim()).toBe('Email');
	});

	it('should render status badges correctly', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const statusBadges = container.querySelectorAll('.status-badge');
		expect(statusBadges).toHaveLength(2);

		// Active status
		expect(statusBadges[0].classList.contains('active')).toBe(true);
		expect(statusBadges[0].textContent?.trim()).toBe('Aktiv');

		// Inactive status
		expect(statusBadges[1].classList.contains('inactive')).toBe(true);
		expect(statusBadges[1].textContent?.trim()).toBe('Inaktiv');
	});

	it('should apply odd class to odd rows', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const rows = container.querySelectorAll('.table-row');
		expect(rows[0].classList.contains('odd')).toBe(false); // First row (index 0)
		expect(rows[1].classList.contains('odd')).toBe(true); // Second row (index 1)
	});

	it('should render footer by default', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				totalEntries: 100,
				itemsPerPage: 50,
				handleScroll: mockHandleScroll
			}
		});

		const footer = container.querySelector('.table-footer');
		const footerText = container.querySelector('.footer-text');

		expect(footer).toBeTruthy();
		expect(footerText).toBeTruthy();
		expect(footerText?.textContent?.trim()).toBe('50 geladen von 100 Ergebnissen');
	});

	it('should not render footer when showFooter is false', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				showFooter: false,
				handleScroll: mockHandleScroll
			}
		});

		const footer = container.querySelector('.table-footer');
		expect(footer).toBeFalsy();
	});

	it('should calculate displayed items correctly when itemsPerPage is less than totalEntries', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				totalEntries: 100,
				itemsPerPage: 25,
				handleScroll: mockHandleScroll
			}
		});

		const footerText = container.querySelector('.footer-text');
		expect(footerText?.textContent?.trim()).toBe('25 geladen von 100 Ergebnissen');
	});

	it('should calculate displayed items correctly when itemsPerPage is greater than totalEntries', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				totalEntries: 10,
				itemsPerPage: 50,
				handleScroll: mockHandleScroll
			}
		});

		const footerText = container.querySelector('.footer-text');
		expect(footerText?.textContent?.trim()).toBe('10 geladen von 10 Ergebnissen');
	});

	it('should handle scroll events', async () => {
		const scrollHandler = vi.fn();
		const { container } = render(Table, {
			props: {
				data: mockData,
				handleScroll: scrollHandler,
				loading: false
			}
		});

		const tableWrapper = container.querySelector('.table-wrapper');
		expect(tableWrapper).toBeTruthy();

		await fireEvent.scroll(tableWrapper!);
		expect(scrollHandler).toHaveBeenCalledTimes(1);
	});

	it('should render with all props combined', () => {
		const scrollHandler = vi.fn();
		const customColumns = [
			{ key: 'id', label: 'ID' },
			{ key: 'name', label: 'Full Name' }
		];

		const { container } = render(Table, {
			props: {
				data: mockData,
				handleScroll: scrollHandler,
				loading: false,
				totalEntries: 200,
				itemsPerPage: 100,
				columns: customColumns,
				showFooter: true
			}
		});

		const table = container.querySelector('.data-table');
		const headers = container.querySelectorAll('.table-header');
		const footer = container.querySelector('.table-footer');
		const footerText = container.querySelector('.footer-text');

		expect(table).toBeTruthy();
		expect(headers).toHaveLength(2);
		expect(headers[0].textContent?.trim()).toBe('ID');
		expect(headers[1].textContent?.trim()).toBe('Full Name');
		expect(footer).toBeTruthy();
		expect(footerText?.textContent?.trim()).toBe('100 geladen von 200 Ergebnissen');
	});

	it('should have proper CSS classes', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const tableContainer = container.querySelector('.data-table-container');
		const tableWrapper = container.querySelector('.table-wrapper');
		const table = container.querySelector('.data-table');
		const headers = container.querySelectorAll('.table-header');
		const rows = container.querySelectorAll('.table-row');
		const cells = container.querySelectorAll('.table-cell');

		expect(tableContainer).toBeTruthy();
		expect(tableWrapper).toBeTruthy();
		expect(table).toBeTruthy();
		expect(headers.length).toBeGreaterThan(0);
		expect(rows.length).toBeGreaterThan(0);
		expect(cells.length).toBeGreaterThan(0);
	});

	it('should handle empty data array', () => {
		const { container } = render(Table, {
			props: {
				data: [],
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const spinner = container.querySelector('.spinner');
		const table = container.querySelector('.data-table');

		expect(spinner).toBeTruthy();
		expect(table).toBeFalsy();
	});

	it('should render table structure correctly', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const table = container.querySelector('.data-table');
		const thead = container.querySelector('thead');
		const tbody = container.querySelector('tbody');

		expect(table).toBeTruthy();
		expect(thead).toBeTruthy();
		expect(tbody).toBeTruthy();
		expect(table?.tagName).toBe('TABLE');
	});

	it('should render with zero totalEntries and itemsPerPage', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				totalEntries: 0,
				itemsPerPage: 0,
				handleScroll: mockHandleScroll
			}
		});

		const footerText = container.querySelector('.footer-text');
		expect(footerText?.textContent?.trim()).toBe('0 geladen von 0 Ergebnissen');
	});

	it('should handle table row hover behavior', () => {
		const { container } = render(Table, {
			props: {
				data: mockData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const rows = container.querySelectorAll('.table-row');
		expect(rows.length).toBeGreaterThan(0);

		// Rows should have hover cursor pointer styling
		rows.forEach((row) => {
			expect(row.classList.contains('table-row')).toBe(true);
		});
	});

	it('should render spinner with correct animation class', () => {
		const { container } = render(Table, {
			props: {
				loading: true,
				handleScroll: mockHandleScroll
			}
		});

		const spinner = container.querySelector('.spinner');
		expect(spinner).toBeTruthy();
		expect(spinner?.classList.contains('spinner')).toBe(true);
	});

	it('should handle data with different active status values', () => {
		const mixedData: MappedEmployeeDataSource[] = [
			{
				personalNumber: 'emp001',
				firstName: 'Active',
				lastName: 'User',
				active: 'active',
				startDate: '2023-01-01'
			},
			{
				personalNumber: 'emp002',
				firstName: 'Inactive',
				lastName: 'User',
				active: 'inactive',
				startDate: '2023-02-01'
			}
		];

		const { container } = render(Table, {
			props: {
				data: mixedData,
				loading: false,
				handleScroll: mockHandleScroll
			}
		});

		const statusBadges = container.querySelectorAll('.status-badge');
		expect(statusBadges[0].classList.contains('active')).toBe(true);
		expect(statusBadges[1].classList.contains('inactive')).toBe(true);
	});
});
