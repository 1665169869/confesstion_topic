<template>
	<v-main class="register-view">
		<div class="title">
			<h2>{{ config.app.name }}</h2>
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
						:src="captcha.image"
						@click="getCaptcha"
					>
						<template #placeholder>
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
						<template #prepend>
							<v-icon icon="mdi-account-plus"></v-icon>
						</template>
						<span>注册</span>
					</v-btn>
				</div>
			</v-form>
		</div>

		<div class="btn-box other">
			<v-btn block rounded="lg" color="#E9E8F9" height="45px" type="button" to="/login">
				<template #prepend>
					<v-icon icon="mdi-login"></v-icon>
				</template>
				<span>登录</span>
			</v-btn>
		</div>
	</v-main>
</template>

<script lang="ts" setup>
import { config } from "@/config";
import { router } from "@/router";
import { isEmail } from "@/utils";
import { BaseService } from "@/utils/request";
import { onActivated, onMounted, reactive, ref } from "vue";

const emailVal = ref("");
const passwordVal = ref("");
const captchaCodeVal = ref("");
const loading = ref(false);
const passwordVisibility = ref(false);

const captcha = reactive({
	id: "",
	image: ""
});

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
		router.push("/authenticated");
	}, 2000);
};

const getCaptcha = () => {
	captcha.image = "";
	captcha.id = "";
	BaseService.captcha({ type: "png", color: "red" }).then((res) => {
		captcha.image = res.data.data?.data || "";
		captcha.id = res.data.data?.captchaId || "";
	});
};

onActivated(getCaptcha);
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
