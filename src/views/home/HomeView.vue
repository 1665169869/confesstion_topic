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
import { useUserStore } from "@/stores/user";
import { onActivated } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

onActivated(() => {
	if (!userStore.token) {
		toast.error("请先登录再访问");
		router.replace("/login");
	}
});
</script>

<style scoped></style>
