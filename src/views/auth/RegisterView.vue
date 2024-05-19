<template>
	<v-main class="register-view">
		<div class="title">
			<h2>寻物启事贴</h2>
		</div>

		<div class="register-label">
			<span>注册</span>
		</div>
		<div class="register-form">
			<v-form validate-on="submit lazy" @submit.prevent :disabled="loading">
				<v-text-field
					name="email"
					label="邮箱"
					id="email"
					placeholder="输入邮箱"
					variant="underlined"
					prepend-inner-icon="mdi-email-outline"
					:rules="[rules.email]"
					color="primary"
					v-model="emailVal"
				></v-text-field>
				<v-text-field
					name="password"
					label="密码"
					color="primary"
					id="password"
					placeholder="输入密码"
					variant="underlined"
					prepend-inner-icon="mdi-lock-outline"
					:append-inner-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="[rules.required, rules.password]"
					:type="passwordVisibility ? 'text' : 'password'"
					@click:append-inner="passwordVisibility = !passwordVisibility"
					v-model="passwordVal"
				></v-text-field>
				<div class="captcha">
					<v-text-field
						name="captcha-code"
						label="图片验证码"
						placeholder="图片所示的验证码"
						variant="underlined"
						:rules="[rules.captchaCode]"
						type="text"
						prepend-inner-icon="mdi-image-outline"
						style="flex: 1"
						v-model="captchaCodeVal"
						color="primary"
					></v-text-field>
					<v-img
						aspect-ratio="16/9"
						style="flex: 1"
						height="50"
						cover
						:src="captchaImage"
					>
						<template v-slot:placeholder>
							<div class="d-flex align-center justify-center fill-height">
								<v-progress-circular
									color="grey-lighten-4"
									indeterminate
								></v-progress-circular>
							</div>
						</template>
					</v-img>
				</div>
				<div class="btn-box">
					<v-btn
						block
						rounded="lg"
						height="45px"
						color="#3C309B"
						type="submit"
						:loading="loading"
						@click="submitRegister"
						selected-class="btn-selected"
					>
						<template v-slot:prepend>
							<v-icon icon="mdi-account-plus"></v-icon>
						</template>
						<span>注册</span>
					</v-btn>
				</div>
			</v-form>
		</div>

		<div class="btn-box other">
			<v-btn
				block
				rounded="lg"
				color="#E9E8F9"
				height="45px"
				type="button"
				@click="$router.push(Router.login)"
			>
				<template v-slot:prepend>
					<v-icon icon="mdi-login"></v-icon>
				</template>
				<span>登录</span>
			</v-btn>
		</div>
	</v-main>
</template>

<script lang="ts" setup>
import { Router, router } from "@/router";
import { isEmail } from "@/utils";
import { onMounted, ref } from "vue";

const emailVal = ref("");
const passwordVal = ref("");
const captchaCodeVal = ref("");
const loading = ref(false);
const passwordVisibility = ref(false);
const captchaImage = ref("");

const rules = {
	email: (val: string) => {
		return isEmail(val) || "请输入正确的邮箱";
	},

	password: (val: string) => {
		return (val && val.length >= 6) || "密码长度至少为6";
	},

	required: (val: string) => {
		return !!val || "内容不能为空";
	},

	captchaCode: (val: string) => {
		return (val && val.length === 4) || "请输入正确的验证码";
	}
};

const submitRegister = (event: Event) => {
	if (!emailVal.value || !passwordVal.value || !captchaCodeVal.value) {
		// emailVal == '' and passwordVal == ''
		return;
	}

	if (
		!isEmail(emailVal.value) ||
		rules.password(passwordVal.value) !== true ||
		rules.captchaCode(captchaCodeVal.value) !== true
	) {
		// 邮箱和密码格式不对
		return;
	}

	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		router.push(Router.authenticated);
	}, 2000);
};

setTimeout(() => {
	captchaImage.value = `data:image/png;base64,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`;
}, 2000);
</script>

<style scoped lang="less">
.btn-box {
	padding: 0 10px;
}
.title {
	color: #434483;
	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		font-size: 30px;
		font-weight: bold;
	}
}

.register-view {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
}

.register-label {
	color: currentColor;
	margin: 24px 0;

	span {
		font-size: 24px;
		font-weight: bold;
	}
}

.register-form {
	flex: 2.5;
	// height: 100%;
}

.btn-selected {
	background-color: #3891ea;
}

.captcha {
	display: flex;
	flex-direction: row;
}
</style>
