import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'index',
                name: '/home/index',
                component: () => import('../views/Index.vue'),
            },
            {
                path: 'actor-list',
                name: '/home/actor-list',
                component: () => import('../views/actor/ActorList.vue'),
            },
            {
                path: 'actor-add',
                name: '/home/actor-add',
                component: () => import('../views/actor/ActorAdd.vue'),
            },
            {
                path: 'director-list',
                name: '/home/director-list',
                component: () => import('../views/director/DirectorList.vue'),
            },
            {
                path: 'director-add',
                name: '/home/director-add',
                component: () => import('../views/director/DirectorAdd.vue'),
            },
            {
                path: 'movie-list',
                name: '/home/director-add',
                component: () => import('../views/movie/MovieList.vue'),
            },
            {
                path: 'movie-add',
                name: '/home/director-add',
                component: () => import('../views/movie/MovieAdd.vue'),
            },
            {
                path: 'movie-update/:id',
                name: '/home/movie-update',
                component: () => import('../views/movie/MovieUpdate.vue'),
            },
        ],
    },
    {
        path: '/',
        redirect: '/home/index',
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
