<template>
	<div>
		<h2>id: {{ $route.params.id }}</h2>
		<v-btn @click="$router.back()">返回上一级</v-btn>
	</div>
</template>

<script lang="ts" setup>
import { BaseService } from "@/utils/request";
import { computed, onActivated } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const detailId = computed<number>(() => Number(route.params.id));

onActivated(async () => {
	const res = await BaseService.detailInfo({ id: detailId.value });
	console.log(res.data);
});
</script>

<style scoped></style>
