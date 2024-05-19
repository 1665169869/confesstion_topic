import { config, isDev, proxy } from "@/config";
import type { CaptchaRequestModel, CaptchaResponseModel } from "@/models/captcha";
import axios, { type AxiosRequestConfig } from "axios";
import { color16 } from ".";

export const axiosInstance = axios.create({
	timeout: import.meta.env.VITE_TIMEOUT,
	withCredentials: false
});

export class BaseService {
	static async request<T = any>(options: AxiosRequestConfig) {
		if (options.url) {
			if (!options.url.startsWith("http")) {
				// 过滤http开头的地址

				if (isDev) {
					options.url = config.baseUrl + options.url;
				}
			}
		}

		return axiosInstance<T>(options);
	}

	static captcha(parmas?: CaptchaRequestModel) {
        if (parmas === undefined) {
            parmas = {} as CaptchaRequestModel;
        }
        if (parmas?.color) {
            parmas.color = color16();
        }

		return this.request<CaptchaResponseModel>({
			method: "GET",
			url: "/api/captcha",
			params: {
				...parmas
			}
		});
	}
}
