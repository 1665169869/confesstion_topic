<script setup lang="ts">
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";

const theme = useTheme();

// @ts-ignore
window.toggletheme = () => {
	theme.global.name.value = theme.global.current.value.dark
		? "customLightTheme"
		: "customDarkTheme";
};
</script>

<template>
	<v-app style="transition: background 0.8s ease-in-out">
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
	</v-app>
</template>

<style scoped></style>
