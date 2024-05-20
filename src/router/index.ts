import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
class Router {
	public static home = "/home";
	public static login = "/login";
	public static register = "/register";
	public static resetPassword = "/forget";
	public static authenticated = "/authenticated";
	public static forum = "/home/forum";
	public static myUser = "/home/my-user";
}
const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		name: "index",
		redirect: Router.home
	},
	{
		path: Router.home,
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
	},
	{
		path: Router.register,
		name: "register",
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../views/auth/RegisterView.vue")
	},
	{
		path: Router.login,
		name: "login",
		component: () => import("../views/auth/LoginView.vue")
	},
	{
		path: Router.resetPassword,
		name: "forget",
		component: () => import("../views/auth/ForgetView.vue")
	},
	{
		path: Router.authenticated,
		name: "authenticated",
		component: () => import("../views/auth/AuthenticateView.vue")
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes
});

export { router, Router };
