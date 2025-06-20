import { render } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoginPage from './+page.svelte';

// Mock $app/navigation
vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

// Mock the api module
vi.mock('$lib/api/api', () => ({
	api: vi.fn()
}));

describe('Login Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should render login page with correct title and text', () => {
		const { getAllByText, getByText } = render(LoginPage);

		expect(getAllByText('Anmelden')[0]).toBeTruthy();
		expect(getByText('Melden Sie sich in Ihrem Konto an')).toBeTruthy();
	});

	it('should have form with proper structure', () => {
		const { container } = render(LoginPage);

		const form = container.querySelector('form.login-form');
		const formGroups = container.querySelectorAll('.form-group');

		expect(form).toBeTruthy();
		expect(formGroups).toHaveLength(2);
	});

	it('should have correct CSS classes', () => {
		const { container } = render(LoginPage);

		const loginContainer = container.querySelector('.login-container');
		const loginWrapper = container.querySelector('.login-wrapper');
		const loginHeader = container.querySelector('.login-header');
		const loginForm = container.querySelector('.login-form');

		expect(loginContainer).toBeTruthy();
		expect(loginWrapper).toBeTruthy();
		expect(loginHeader).toBeTruthy();
		expect(loginForm).toBeTruthy();
	});

	it('should render form groups for email and password', () => {
		const { container } = render(LoginPage);

		const formGroups = container.querySelectorAll('.form-group');
		expect(formGroups).toHaveLength(2);
	});

	it('should have proper document structure', () => {
		const { container } = render(LoginPage);

		// Check main container structure
		const loginContainer = container.querySelector('.login-container');
		expect(loginContainer).toBeTruthy();

		// Check wrapper
		const loginWrapper = container.querySelector('.login-wrapper');
		expect(loginWrapper).toBeTruthy();

		// Check header content
		const loginHeader = container.querySelector('.login-header');
		expect(loginHeader).toBeTruthy();
	});

	it('should have form element', () => {
		const { container } = render(LoginPage);

		const form = container.querySelector('form');
		expect(form).toBeTruthy();
		expect(form?.tagName).toBe('FORM');
	});
});
