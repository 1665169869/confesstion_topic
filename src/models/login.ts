export interface LoginRequestModel {
	email: string;
	password: string;
}

export interface LoginResponseModel {
	code: number;
	message: string;
	data?: Data;
}

interface Data {
	expire: number;
	token: string;
	refreshExpire: number;
	refreshToken: string;
}
