<template>
	<v-main class="login-view">
		<div class="title">
			<h2 class="text-primary-title-color">{{ config.app.name }}</h2>
		</div>

		<div class="login-label">
			<span>登录</span>
		</div>
		<div class="login-form">
			<v-form validate-on="submit lazy" @submit.prevent :disabled="loading">
				<v-text-field
					name="email"
					label="邮箱"
					id="email"
					placeholder="输入邮箱"
					variant="underlined"
					color="primary"
					prepend-inner-icon="mdi-email-outline"
					:rules="[rules.email]"
					v-model="emailVal"
				></v-text-field>
				<v-text-field
					name="password"
					label="密码"
					id="password"
					placeholder="输入密码"
					variant="underlined"
					prepend-inner-icon="mdi-lock-outline"
					color="primary"
					:append-inner-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="[rules.required, rules.password]"
					:type="passwordVisibility ? 'text' : 'password'"
					@click:append-inner="passwordVisibility = !passwordVisibility"
					v-model="passwordVal"
				></v-text-field>
				<div class="btn-box">
					<v-btn
						block
						rounded="lg"
						color="#3C309B"
						height="45px"
						selected-class="btn-selected"
						type="submit"
						:loading="loading"
						@click="submitLogin"
					>
						<template v-slot:prepend>
							<v-icon icon="mdi-login"></v-icon>
						</template>
						<span>登录</span>
					</v-btn>
				</div>
			</v-form>
			<div class="reset-password">
				<router-link :to="Router.resetPassword">忘记密码</router-link>
			</div>
		</div>

		<div class="btn-box other">
			<v-btn
				block
				rounded="lg"
				height="45px"
				color="#E9E8F9"
				type="button"
				@click="$router.push(Router.register)"
			>
				<template v-slot:prepend>
					<v-icon icon="mdi-account-plus"></v-icon>
				</template>
				<span>注册</span>
			</v-btn>
		</div>
	</v-main>
</template>

<script lang="ts" setup>
import { config } from "@/config";
import { Router, router } from "@/router";
import { isEmail } from "@/utils";
import { ref } from "vue";
const emailVal = ref("");
const passwordVal = ref("");
const loading = ref(false);
const rules = {
	email: (val: string) => {
		return isEmail(val) || "请输入正确的邮箱";
	},

	password: (val: string) => {
		return (val && val.length >= 6) || "密码长度至少为6";
	},

	required: (val: string) => {
		return !!val || "内容不能为空";
	}
};

const passwordVisibility = ref(false);

const submitLogin = (event: Event) => {
	if (!emailVal.value || !passwordVal.value) {
		// emailVal == '' and passwordVal == ''
		return;
	}

	if (!isEmail(emailVal.value) || rules.password(passwordVal.value) !== true) {
		// 邮箱和密码格式不对
		return;
	}

	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		router.push(Router.authenticated);
	}, 2000);
};
</script>

<style scoped lang="less">
.btn-box {
	padding: 0 10px;
}
.title {
	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		font-size: 30px;
		font-weight: bold;
	}
}

.login-view {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
}

.login-label {
	color: currentColor;
	margin: 24px 0;

	span {
		font-size: 24px;
		font-weight: bold;
	}
}

.login-form {
	flex: 2.5;
	// height: 100%;
}

.btn-selected {
	background-color: #3891ea;
}

.reset-password {
	text-align: center;
	margin-top: 25px;
	a {
		color: currentColor;
		text-decoration: none;
	}
}
</style>
