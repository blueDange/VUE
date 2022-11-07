import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('../Detail.vue'),
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../List.vue'),
    },
    {
        path: '/detail/:suibian',
        name: 'detail',
        component: () => import('../Detail.vue'),
    },
    {
        path: '/button',
        name: 'button',
        component: () => import('../views/Button.vue'),
    },
    {
        path: '/nav',
        name: 'nav',
        component: () => import('../views/Nav.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
