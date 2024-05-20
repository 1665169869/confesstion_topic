import devConfig from "./dev.config";
import prodConfig from "./prod.config";

export const isDev = import.meta.env?.DEV;

export const config = {
	app: {
		name: import.meta.env?.VITE_APP_NAME
	},

	...(isDev ? devConfig : prodConfig)
};

export * from "./proxy.config";
