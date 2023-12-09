import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";

const _router = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/buat-transaksi",
        name: "transaction-add",
        component: () => import("../views/pages/TransaksiAdd.vue"),
    },
    {
        path: "toko",
        name: "store-list",
        // redirect: "/coming-soon",
        component: () => import("../views/pages/Store.vue"),
    },
    {
        path: "notifikasi",
        name: "notifications",
        // redirect: "/coming-soon",
        component: () => import("../views/pages/Notifications.vue"),
    },
    {
        path: "pengaturan",
        name: "settings",
        // redirect: "/coming-soon",
        component: () => import("../views/pages/Settings.vue"),
    },

    // TODO: UNDER THE HOME MENU
    {
        path: "produk-saya",
        name: "home-product-list",
        redirect: "/coming-soon",
        component: () => import("../views/pages/Settings.vue"),
    },
    {
        path: "semua-transaksi",
        name: "home-transaction-list",
        redirect: "/coming-soon",
        component: () => import("../views/pages/Settings.vue"),
    },
    {
        path: "transaksi-terjeda",
        name: "home-transaction-delay",
        redirect: "/coming-soon",
        // component: () => import("../views/pages/"),
    },
    {
        path: "distribusi",
        name: "home-distribution-list",
        redirect: "/coming-soon",
        // component: () => import("../views/pages/"),
    },
    {
        path: "saler",
        name: "home-saler-list",
        redirect: "/coming-soon",
        // component: () => import("../views/pages/"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: AppLayout,
            children: _router,
        },
        {
            path: "/coming-soon",
            name: "coming-soon",
            component: () => import("../views/pages/dev/ComingSoon.vue"),
        },
    ],
});

export default router;
