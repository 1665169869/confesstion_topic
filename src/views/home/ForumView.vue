<template>
	<v-btn to="/detail/1" color="info">跳转帖子</v-btn>
	<v-btn to="/detail/2" color="info">跳转帖子</v-btn>
	<v-btn @click="click" color="info">弹出弹窗</v-btn>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
onMounted(() => {
	console.log("ForumView mounted");
});

const click = () => {
	toast.info("测试");
};
</script>

<style scoped></style>
