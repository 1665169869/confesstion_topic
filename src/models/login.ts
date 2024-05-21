export interface LoginRequestModel {
	email: string;
	password: string;
}

export interface LoginResponseModel {
	code: number;
	message: string;
	data?: LoginDataResponseModel;
}

export interface LoginDataResponseModel {
	expire: number;
	token: string;
	refreshExpire: number;
	refreshToken: string;
}
