import type { Employee, MappedEmployeeDataSource } from '$lib/types/employee';
import { formatDate } from './dateTime';

export const mapEmployeeResponseToDataSource = (
	employees: Employee[]
): MappedEmployeeDataSource[] => {
	return employees.map((employee) => ({
		personalNumber: employee.externalId?.split('-')[0].trim().toLowerCase() || '',
		firstName: employee.firstName,
		lastName: employee.lastName,
		active: employee.active ? 'active' : 'inactive',
		startDate: formatDate(employee.created)
	}));
};
