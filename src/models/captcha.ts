export interface CaptchaResponseModel {
	code: number;
	message: string;
	data?: Data;
}

export enum captchaTypes {
	/**
	 * 图片格式
	 */
	PNG = "png",
	/**
	 * SVG XMl格式
	 */
	SVG = "svg",
	/**
	 * SVG Base64格式
	 */
	JPEG = "base64"
}

export interface CaptchaRequestModel {
	type?: captchaTypes | string;
	width?: number;
	height?: number;
	color?: string;
}

interface Data {
	captchaId: string;
	data: string;
}
