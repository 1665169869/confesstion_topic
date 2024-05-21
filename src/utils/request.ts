import { config, isDev } from "@/config";
import type { CaptchaRequestModel, CaptchaResponseModel } from "@/models/captcha";
import axios, { type AxiosRequestConfig } from "axios";
import { color16, storage } from ".";
import type { LoginRequestModel, LoginResponseModel } from "@/models/login";
import { useUserStore } from "@/stores/user";
import { TYPE, useToast } from "vue-toastification";
import type { DetailRequestModel, DetailResponseModel } from "@/models/detail";
import type { RefreshTokenRequestModel, RefreshTokenResponseModel } from "@/models/refreshToken";

export const axiosInstance = axios.create({
	timeout: import.meta.env.VITE_TIMEOUT,
	withCredentials: false
});

axiosInstance.interceptors.request.use(
	(config) => {
		const userStore = useUserStore();
		const toast = useToast();

		if (userStore.token) {
			if (storage.isExpired("token")) {
				// refreshToken是否过期
				if (storage.isExpired("refreshToken")) {
					toast.error("登录过期，请重新登录~", {
						timeout: 2000,
						type: TYPE.ERROR
					});
					userStore.logout();
				} else {
					// 刷新token
					BaseService.refreshToken({ refreshToken: storage.get("refreshToken") })
						.then((res) => {
							const { data } = res.data;
							userStore.setToken(data);
						})
						.catch((err) => {
							toast.error("登录过期，请重新登录~", {
								timeout: 2000,
								type: TYPE.ERROR
							});
							userStore.logout();
						});
				}
			}
			config.headers.Authorization = storage.get("token");
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

axiosInstance.interceptors.response.use(
	(resp) => {
		const { code, message } = resp.data;

		if (code === 1000) {
			return resp;
		} else {
			return Promise.reject({ code, message });
		}
	},
	(err) => {
		const toast = useToast();

		toast.error(err.message, {
			timeout: 2000,
			type: TYPE.ERROR
		});

		return Promise.reject(err);
	}
);

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

	static login(body: LoginRequestModel) {
		return this.request<LoginResponseModel>({
			method: "POST",
			url: "/app/user/login/email",
			data: {
				...body
			}
		});
	}

	// 获取帖子详情
	static detailInfo(parmas: DetailRequestModel) {
		return this.request<DetailResponseModel>({
			method: "GET",
			url: "/app/confession/topic/info",
			params: {
				...parmas
			}
		});
	}

	static refreshToken(body: RefreshTokenRequestModel) {
		return this.request<RefreshTokenResponseModel>({
			method: "POST",
			url: "/app/user/login/refreshToken",
			data: {
				...body
			}
		});
	}
}
