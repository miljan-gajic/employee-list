export type Employee = {
	id: string;
	active: boolean;
	appCode: string;
	clientId: string;
	created: string;
	externalId: string | null;
	custom2: string | null;
	custom3: string | null;
	employeeKey: string | null;
	firstDay: string;
	firstName: string;
	language: string;
	lastName: string;
	latestReminder: string | null;
	modified: string;
	nextReminder: string | null;
	personalData: string | null;
	personalDataModules: string | null;
	phone: string;
	privacyConfirmed: boolean;
	rollout: boolean;
	status: 'open' | 'closed' | 'pending'; // Assuming "status" is an enum-like field
};

export type CreateEmployee = {
	active: boolean;
	externalId?: string;
	custom2?: string;
	custom3?: string;
	email?: string;
	employeeKey?: string;
	firstDay?: string; // Assuming this is a date in string format
	firstName: string;
	language: string;
	lastName: string;
	personalData?: string;
	personalDataModules?: string;
	phone?: string;
	privacyConfirmed?: boolean;
	thirdFactor?: string;
};

export type BulkImportEmployeeResponse = {
	href: string;
	id: string;
};

export type EmployeeListResponse = {
	data: {
		limit: number;
		offset: number;
		total: number;
		rows: Employee[];
	};
};

export type MappedEmployeeDataSource = {
	personalNumber: string;
	firstName: string;
	lastName: string;
	active: string;
	startDate: string;
};

export type ImportStatus = {
	clientId: string;
	created: Date | string;
	failed: number;
	id: string;
	method: string;
	modified: Date | string;
	rowsCreated: number;
	rowsModified: number;
	source: string;
	sourceId: string;
	status: string;
	succeeded: number;
	total: number;
	userId: string;
};
