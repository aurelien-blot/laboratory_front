import { createRouter, createWebHistory } from 'vue-router';
import MapGenHome from "@/map_gen/views/MapGenHome.vue";

const baseUrl = '/mapgen';
const routes = [
    { path: baseUrl, component: MapGenHome, name: 'MapGenHome'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;