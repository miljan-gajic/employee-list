export type AuthResponse = {
	clientId: string | null;
	expiresIn: number | null;
	refreshToken: string | null;
	token: string | null;
	tokenType: string | null;
	username: string | null;
};
