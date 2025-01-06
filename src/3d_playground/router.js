import { createRouter, createWebHistory } from 'vue-router';
import PlaygroundHome from "@/3d_playground/views/PlaygroundHome.vue";

const baseUrl = '/3d';
const routes = [
    { path: baseUrl, component: PlaygroundHome, name: 'PlaygroundHome'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;