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
    {
        path: '/container',
        name: 'container',
        component: () => import('../views/Container.vue'),
		// 路由重定向,若用户直接访问/container,则直接跳转到该路由地址
		redirect: '/container/button',
        children: [
            {
                path: 'button',
                name: 'button',
                component: () => import('../views/Button.vue'),
            },
            {
                path: 'table',
                name: 'table',
                component: () => import('../views/Table.vue'),
            },
            {
                path: 'form',
                name: 'form',
                component: () => import('../views/Form.vue'),
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
