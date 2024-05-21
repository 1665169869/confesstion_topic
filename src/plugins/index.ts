import type { App } from "vue";
import vuetify from "./vuetify";
import { createPinia } from "pinia";
import { router } from "@/router";
import Toast from "vue-toastification";
import toastPluginOptions from "./toast";

export default function usePlugins(app: App<Element>) {
	app.use(vuetify);
	app.use(createPinia());
	app.use(router);
	app.use(Toast, toastPluginOptions);
}
