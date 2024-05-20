<template>
	<div>
		<h2>id: {{ $route.params.id }}</h2>
		<v-btn @click="$router.back()">返回上一级</v-btn>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
	console.log("detail onMounted");
});
</script>

<style scoped></style>
