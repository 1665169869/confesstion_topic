import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import vuetifyPlugin from "vite-plugin-vuetify";
import postcssPresetEnv from "postcss-preset-env";

import { proxy } from "./src/config/proxy.config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuetifyPlugin({
			autoImport: true
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	css: {
		postcss: {
			plugins: [postcssPresetEnv()]
		}
	},
	server: {
		proxy
	}
});
