import { createRouter, createWebHistory } from 'vue-router';
import QuickMailHome from "@/quick_mail/views/QuickMailHome.vue";

const baseUrl = '/quick-mail';
const routes = [
    { path: baseUrl, component: QuickMailHome, name: 'QuickMailHome'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;