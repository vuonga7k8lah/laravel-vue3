const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/admin.vue"),
        children: [
            //route users
            {
                path: "users",
                name: "admin-users",
                component: () => import("../pages/users/index.vue"),
            },
            {
                path: "users/create",
                name: "admin-users-create",
                component: () => import("../pages/users/create.vue"),
            },

            //route roles
            {
                path: "roles",
                name: "admin-roles",
                component: () => import("../pages/roles/index.vue"),
            },
            //route settings
            {
                path: "settings",
                name: "admin-settings",
                component: () => import("../pages/settings/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("../pages/auth/login.vue"),
    },
    {
        path: "/register",
        component: () => import("../pages/auth/register.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];
export default admin;
