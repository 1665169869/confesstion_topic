import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";

const customDarkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		background: "#181A1B",
		"primary-text": "#FFFFFF",
		"secondary-text": "#BDBDBD"
	}
};

const customLightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		background: "#f8f8f8",
		"primary-text": "#000000",
		"secondary-text": "#757575"
	}
};

const vuetify = createVuetify({
	components,
	directives,
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
