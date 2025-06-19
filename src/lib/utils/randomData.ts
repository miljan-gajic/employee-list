import { type CreateEmployee } from '$lib/types/employee';
import { faker } from '@faker-js/faker'; // Optional: Install faker for realistic random data

export function generateRandomEmployee(): CreateEmployee {
	return {
		externalId: faker.string.uuid(),
		active: faker.datatype.boolean(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		language: faker.helpers.arrayElement(['en', 'es', 'de', 'fr', 'zh'])
	};
}

export function generateEmployeeList(count: number): CreateEmployee[] {
	const employees = [];
	for (let i = 0; i < count; i++) {
		employees.push(generateRandomEmployee());
	}
	return employees;
}
