// noinspection ES6UnusedImports

import { createRouter, createWebHistory } from 'vue-router';
import MapGenRouter from '@/map_gen/router.js';
import TruckLoadingRouter from '@/truck_loading/router.js';
import Home from "@/laboratory/views/Home.vue";
import store from '@/laboratory/store/store.js';

const routes = [
    { path: '/', component: Home, name: 'Home'},
    ...MapGenRouter.getRoutes(),
    ...TruckLoadingRouter.getRoutes(),
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;