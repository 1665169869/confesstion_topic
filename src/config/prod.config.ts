import { proxy } from "./proxy.config";

export default {
	// 根地址
	host: proxy["/prod/"].target,

	// 请求地址
	baseUrl: "/api"
};
