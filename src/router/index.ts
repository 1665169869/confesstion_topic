import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { baseRoutes } from "./baseRoutes";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: baseRoutes
});

const appendRoutes = function (routes: Readonly<RouteRecordRaw[]>) {
	routes.forEach((route) => {
		router.addRoute(route);
	});
};

const clearRoutes = function () {
	const rs = router.getRoutes();

	rs.forEach((route) => {
		if (route.name && route.meta?.dynamic) {
			router.removeRoute(route.name);
		}
	});
};
export { router, baseRoutes, appendRoutes, clearRoutes };
