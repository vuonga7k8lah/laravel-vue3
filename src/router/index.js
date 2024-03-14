import { createRouter, createWebHistory } from "vue-router";
import Admin from "./admin";
import { useAuthStore } from "../stores/use-auth";

const routes = [...Admin];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/login", "/register"];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return "/login";
    }
});

export default router;
