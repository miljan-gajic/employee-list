import type { BulkImportEmployeeResponse, CreateEmployee, Employee } from '$lib/types/employee';
import { api } from './api';

export async function bulkImportEmployees(
	employees: CreateEmployee[],
	token?: string
): Promise<BulkImportEmployeeResponse> {
	return api<BulkImportEmployeeResponse>(
		'/employees/bulk/import',
		{
			method: 'POST',
			body: JSON.stringify({ rows: employees })
		},
		token,
		false
	);
}

export async function bulkImportStatus(id?: string, token?: string) {
	return api(`/employees/bulk/import/${id}`, {}, token, false);
}

export async function getEmployeesList(
	offset: number,
	limit: number,
	token?: string
): Promise<Employee[]> {
	return api<Employee[]>(`/employees?limit=${limit}&offset=${offset}`, {}, token, false);
}
