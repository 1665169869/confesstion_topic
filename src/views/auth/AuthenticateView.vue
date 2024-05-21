<template>
	<transition name="fade" mode="out-in">
		<v-main class="wrapper">
			<v-form class="auth-form" @submit.prevent>
				<div class="position-relative">
					<v-fab
						class="position-absolute"
						style="left: 1rem; top: 2rem"
						prepend-icon="$vuetify"
						text="返回"
						@click="backFunc()"
						extended
					></v-fab>
				</div>
				<v-row class="auth-header">
					<v-col>
						<h1 class="title text-primary-color">Authenticate Code</h1>
						<p class="desc text-secondary-color">输入发送到您邮件的六位数验证码</p>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-otp-input
							length="6"
							variant="outlined"
							autofocus
							:disabled="loading"
							base-color="primary"
							@finish="submitCode"
						></v-otp-input>
						<p class="resend-code">未收到验证码？<a href="#">重新获取</a></p>
						<v-btn
							block
							color="#4D7CF2"
							height="3rem"
							:loading="loading"
							type="submit"
							@click="submitCode"
							>确认代码</v-btn
						>
					</v-col>
				</v-row>
			</v-form>
		</v-main>
	</transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const router = useRouter();
const submitCode = () => {
	loading.value = true;

	setTimeout(() => {
		loading.value = false;
		router.replace("/home");
	}, 2000);
};
const backFunc = () => {
	console.log(router.options.history.state);
	router.replace((router.options.history.state?.back || "/login") as string);
};
</script>

<style scoped lang="scss">
.title {
	justify-content: left;
	font-size: 1.5rem;
	font-weight: bold;
}

.desc {
	justify-content: left;

	font-size: 0.8rem;
}

.auth-form {
	height: 100vh;
	display: flex;
	flex-direction: column;
	> .v-row {
		margin: 0;
	}

	.auth-header {
		flex: 1.65;
		align-items: end;
		padding: 0 1rem;
		background: url("@/assets/1.png") no-repeat;
		background-size: 100% auto;
	}
}

.resend-code {
	text-align: right;
	font-size: 0.8rem;
	padding: 0 0.5rem 0.4rem;

	a {
		text-decoration: none;
		color: #4d7cf2;
	}
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.45s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
