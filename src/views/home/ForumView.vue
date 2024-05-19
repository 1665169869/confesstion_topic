<template>
	<v-btn to="/detail/123" color="info">跳转帖子</v-btn>
	<v-btn to="/detail/12323" color="info">跳转帖子</v-btn>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const count = ref(0);

onMounted(() => {
	console.log("ForumView mounted");
});
</script>

<style scoped></style>
