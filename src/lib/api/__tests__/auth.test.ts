import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { login, logout } from '../auth';
import { api } from '../api';

// Mock the api module
vi.mock('../api', () => ({
	api: vi.fn()
}));

const mockApi = vi.mocked(api);

describe('auth', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('login', () => {
		it('should call api with correct parameters for login', async () => {
			const mockAuthResponse = {
				token: 'test-token',
				refreshToken: 'test-refresh-token',
				expiresIn: 3600
			};

			mockApi.mockResolvedValueOnce(mockAuthResponse);

			const result = await login('test@example.com', 'password123');

			expect(mockApi).toHaveBeenCalledWith(
				'/auth/sign-in',
				{
					method: 'POST',
					body: JSON.stringify({
						email: 'test@example.com',
						password: 'password123'
					})
				},
				undefined,
				false
			);
			expect(result).toEqual(mockAuthResponse);
		});

		it('should handle login with different credentials', async () => {
			const mockAuthResponse = {
				token: 'another-token',
				refreshToken: 'another-refresh-token',
				expiresIn: 7200
			};

			mockApi.mockResolvedValueOnce(mockAuthResponse);

			const result = await login('user@test.com', 'mypassword');

			expect(mockApi).toHaveBeenCalledWith(
				'/auth/sign-in',
				{
					method: 'POST',
					body: JSON.stringify({
						email: 'user@test.com',
						password: 'mypassword'
					})
				},
				undefined,
				false
			);
			expect(result).toEqual(mockAuthResponse);
		});

		it('should throw error when login fails', async () => {
			const errorMessage = 'Invalid credentials';
			mockApi.mockRejectedValueOnce(new Error(errorMessage));

			await expect(login('wrong@email.com', 'wrongpassword')).rejects.toThrow(errorMessage);
		});
	});

	describe('logout', () => {
		it('should call api with correct parameters for logout with refresh token', async () => {
			mockApi.mockResolvedValueOnce(undefined);

			await logout('test-refresh-token');

			expect(mockApi).toHaveBeenCalledWith(
				'/auth/sign-out',
				{
					method: 'POST',
					body: JSON.stringify({ refreshToken: 'test-refresh-token' })
				},
				undefined,
				false
			);
		});

		it('should call api with undefined refresh token', async () => {
			mockApi.mockResolvedValueOnce(undefined);

			await logout();

			expect(mockApi).toHaveBeenCalledWith(
				'/auth/sign-out',
				{
					method: 'POST',
					body: JSON.stringify({ refreshToken: undefined })
				},
				undefined,
				false
			);
		});

		it('should handle logout errors gracefully', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const errorMessage = 'Logout failed';
			mockApi.mockRejectedValueOnce(new Error(errorMessage));

			// Should not throw error even when API fails
			await expect(logout('invalid-token')).resolves.toBeUndefined();

			expect(consoleSpy).toHaveBeenCalledWith('from api layer', expect.any(Error));
			consoleSpy.mockRestore();
		});

		it('should handle logout with empty refresh token', async () => {
			mockApi.mockResolvedValueOnce(undefined);

			await logout('');

			expect(mockApi).toHaveBeenCalledWith(
				'/auth/sign-out',
				{
					method: 'POST',
					body: JSON.stringify({ refreshToken: '' })
				},
				undefined,
				false
			);
		});
	});
});
