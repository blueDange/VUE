import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/',
        redirect: '/home/index',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        children: [
            {
                path: 'index',
                name: '/home/index',
                component: () => import('../views/index/Index.vue'),
            },
            {
                path: 'video',
                name: '/home/video',
                component: () => import('../views/video/Video.vue'),
            },
            {
                path: 'show',
                name: '/home/show',
                component: () => import('../views/show/Show.vue'),
            },
            {
                path: 'me',
                name: '/home/me',
                component: () => import('../views/me/Me.vue'),
            },
        ],
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
