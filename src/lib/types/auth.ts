export type AuthResponse = {
	clientId: string;
	expiresIn: number;
	refreshToken: string;
	token: string;
	tokenType: string;
	username: string;
};
