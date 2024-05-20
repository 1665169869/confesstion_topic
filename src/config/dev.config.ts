import { getUrlParam } from "../utils";
import { proxy } from "./proxy.config";
import storage from "../utils/storage";

export default {
	host: proxy["/dev/"].target,

	get baseUrl() {
		let proxy = getUrlParam("proxy");

		if (proxy) {
			storage.set("proxy", proxy);
		} else {
			proxy = storage.get("proxy") || "dev";
		}

		return `/${proxy}`;
	}
};
