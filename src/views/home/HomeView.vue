<template>
	<div>
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
	<div>
		<tab-bar-bottom></tab-bar-bottom>
	</div>
</template>

<script lang="ts" setup>
import TabBarBottom from "@/components/TabBarBottom.vue";

defineProps({});
</script>

<style scoped></style>
