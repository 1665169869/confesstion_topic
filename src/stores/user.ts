import type { LoginDataResponseModel } from "@/models/login";
import { storage } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const data = storage.info();
export const useUserStore = defineStore("user", function () {
	const router = useRouter();

	const token = ref<string>(data.token);
	// TODO 泛型待定
	const info = ref<any | null>({});

	// 设置token
	const setToken = (data: LoginDataResponseModel) => {
		token.value = data.token;
		storage.set("token", data.token, data.expire);
		storage.set("refreshToken", data.refreshToken, data.refreshExpire);
	};

	// 清除用户
	const clear = () => {
		storage.remove("info");
		storage.remove("token");
		storage.remove("refreshToken");
		token.value = "";
		info.value = null;
	};

	const logout = () => {
		clear();
		router.replace("/login");
	};

	return {
		token,
		info,
		setToken,
		clear,
		logout
	};
});
