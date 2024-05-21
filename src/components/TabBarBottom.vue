<template>
	<div>
		<v-btn class="add-topic" value="add" icon="mdi-plus"></v-btn>
		<v-bottom-navigation
			v-model="navVal"
			color="primary"
			:elevation="3"
			mode="shift"
			:mandatory="true"
			@update:model-value="pushFunc"
			grow
		>
			<v-btn value="forum">
				<v-icon icon="mdi-forum"></v-icon>
				<span>浏览帖子</span>
			</v-btn>
			<v-btn value="user">
				<v-icon icon="mdi-account"></v-icon>
				<span>个人中心</span>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>
<script lang="ts">
import { router } from "@/router";
import { ref } from "vue";

export default {
	name: "bottom-nav",
	props: {
		tab: {
			type: String,
			default: "forum"
		}
	},
	setup() {
		const routes = {
			forum: "/home/forum",
			user: "/home/my-user"
		};

		const navVal = ref("forum");
		const pushFunc = () => {
			router.push(routes[navVal.value]);
		};
		return { navVal, pushFunc };
	}
};
</script>

<style scoped></style>
<style scoped lang="scss">
.add-topic {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 1.5rem;
	z-index: 9999;
}
</style>
