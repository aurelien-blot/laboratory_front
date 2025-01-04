import { createRouter, createWebHistory } from 'vue-router';
import TruckLoadingHome from "@/truck_loading/views/TruckLoadingHome.vue";

const baseUrl = '/truckloading';
const routes = [
    { path: baseUrl, component: TruckLoadingHome, name: 'TruckLoadingHome'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;