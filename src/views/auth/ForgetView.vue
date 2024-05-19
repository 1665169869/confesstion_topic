<template>
	<div>
		test
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: ["id"],
	setup(props) {
		console.log(props);
		return {};
	}
});
</script>

<style scoped></style>
