import type { RouteRecordRaw } from "vue-router";

export const baseRoutes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		name: "index",
		redirect: "/home"
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/auth/RegisterView.vue")
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/auth/LoginView.vue")
	},
	{
		path: "/forget",
		name: "forget",
		component: () => import("../views/auth/ForgetView.vue")
	},
	{
		path: "/authenticated",
		name: "authenticated",
		component: () => import("../views/auth/AuthenticateView.vue")
	},
	{
		path: "/home",
		name: "home",
		redirect: "/home/forum",
		component: () => import("../views/home/HomeView.vue"),
		children: [
			{
				path: "forum",
				name: "forum",
				component: () => import("../views/home/ForumView.vue")
			},
			{
				path: "my-user",
				name: "my-user",
				component: () => import("../views/home/UserView.vue")
			}
		]
	},
	{
		path: "/detail/:id",
		name: "forum-detail",
		component: () => import("../views/Detail.vue")
	}
];
