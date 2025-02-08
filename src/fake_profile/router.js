import { createRouter, createWebHistory } from 'vue-router';
import FakeProfileHome from "@/fake_profile/views/FakeProfileHome.vue";

const baseUrl = '/fake-profile';
const routes = [
    { path: baseUrl, component: FakeProfileHome, name: 'FakeProfileHome'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;