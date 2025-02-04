// noinspection ES6UnusedImports

import { createRouter, createWebHistory } from 'vue-router';
import MapGenRouter from '@/map_gen/router.js';
import TruckLoadingRouter from '@/truck_loading/router.js';
import ThreeDPlaygroundRouter from '@/3d_playground/router.js';
import QuickMailRouter from '@/quick_mail/router.js';
import Home from "@/laboratory/views/Home.vue";
import store from '@/laboratory/store/store.js';

const routes = [
    { path: '/', component: Home, name: 'Home'},
    ...MapGenRouter.getRoutes(),
    ...TruckLoadingRouter.getRoutes(),
    ...ThreeDPlaygroundRouter.getRoutes(),
    ...QuickMailRouter.getRoutes(),
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;