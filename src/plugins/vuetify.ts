import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "vuetify/styles";

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
	components,
	directives,
	icons: {
		defaultSet: "mdi"
	},
	theme: {
		defaultTheme: "customDarkTheme",
		themes: {
			customDarkTheme,
			customLightTheme
		}
	}
});

export default vuetify;
