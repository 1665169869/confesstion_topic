import { createVuetify, type ThemeDefinition } from "vuetify";

import("vuetify/styles/main.sass");
import("@mdi/font/scss/materialdesignicons.scss");

const customDarkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		background: "#181A1B",
		"primary-color": "#FFFFFF",
		"secondary-color": "#BDBDBD",
		"primary-title-color": "#434483"
	}
};

const customLightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		background: "#f8f8f8",
		"primary-color": "#000000",
		"secondary-color": "#757575",
		"primary-title-color": "#434483"
	}
};

const vuetify = createVuetify({
	icons: {
		defaultSet: "mdi"
	},
	theme: {
		defaultTheme: "customLightTheme",
		themes: {
			customDarkTheme,
			customLightTheme
		}
	}
});

export default vuetify;
