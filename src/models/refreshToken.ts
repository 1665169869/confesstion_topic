import type { LoginResponseModel } from "./login";

export interface RefreshTokenRequestModel {
	refreshToken: string;
}
export interface RefreshTokenResponseModel extends LoginResponseModel {}
