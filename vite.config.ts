import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import vuetifyPlugin from "vite-plugin-vuetify";
import postcssPresetEnv from "postcss-preset-env";

import { proxy } from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
				entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
				assetFileNames: "[ext]/[name]-[hash].[ext]" // 资源文件像 字体，图片等
			}
		}
	},
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
