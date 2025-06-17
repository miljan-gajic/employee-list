export type Employee = {
	id: string;
	active: boolean;
	appCode: string;
	clientId: string;
	created: string; // ISO date string
	custom1: string | null;
	custom2: string | null;
	custom3: string | null;
	employeeKey: string | null;
	firstDay: string; // ISO date string
	firstName: string;
	language: string;
	lastName: string;
	latestReminder: string | null; // ISO date string or null
	modified: string; // ISO date string
	nextReminder: string | null; // ISO date string or null
	personalData: string | null;
	personalDataModules: string | null;
	phone: string;
	privacyConfirmed: boolean;
	rollout: boolean;
	status: 'open' | 'closed' | 'pending'; // Assuming "status" is an enum-like field
};
