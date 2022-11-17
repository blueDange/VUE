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
                meta: {
                    nav: ['首页'],
                },
            },
            {
                path: 'actor-list',
                name: '/home/actor-list',
                component: () => import('../views/actor/ActorList.vue'),
                meta: {
                    nav: ['演员列表', '演员列表'],
                },
            },
            {
                path: 'actor-add',
                name: '/home/actor-add',
                component: () => import('../views/actor/ActorAdd.vue'),
                meta: {
                    nav: ['演员列表', '新增演员'],
                },
            },
            {
                path: 'director-list',
                name: '/home/director-list',
                component: () => import('../views/director/DirectorList.vue'),
                meta: {
                    nav: ['导演管理', '导演列表'],
                },
            },
            {
                path: 'director-add',
                name: '/home/director-add',
                component: () => import('../views/director/DirectorAdd.vue'),
                meta: {
                    nav: ['导演管理', '添加导演'],
                },
            },
            {
                path: 'movie-list',
                name: '/home/director-add',
                component: () => import('../views/movie/MovieList.vue'),
                meta: {
                    nav: ['演员管理', '演员列表'],
                },
            },
            {
                path: 'movie-add',
                name: '/home/director-add',
                component: () => import('../views/movie/MovieAdd.vue'),
                meta: {
                    nav: ['演员管理', '新增演员'],
                },
            },
            {
                path: 'movie-update/:id',
                name: '/home/movie-update',
                component: () => import('../views/movie/MovieUpdate.vue'),
                meta: {
                    nav: ['演员管理', '修改演员信息'],
                },
            },
            {
                path: 'cinema-list',
                name: '/home/cinema-add',
                component: () => import('../views/cinema/CinemaList.vue'),
                meta: {
                    nav: ['电影院历', '电影院列表'],
                },
            },
            {
                path: 'cinema-add',
                name: '/home/cinema-add',
                component: () => import('../views/cinema/CinemaAdd.vue'),
                meta: {
                    nav: ['电影院管理', '新增电影院'],
                },
            },
            {
                path: 'cinema-room-list/:cinema_id',
                name: '/home/cinema-room-list', // 不重复即可
                component: () => import('../views/cinema/CinemaRoomList.vue'),
                meta: {
                    nav: ['电影院管理', '电影院列表', '放映厅列表'],
                },
            },
            {
                path: 'showingonplan-add',
                name: '/home/showingonplan-add', // 不重复即可
                component: () => import('../views/cinema/ShowingonPlanAdd.vue'),
                meta: {
                    nav: [
                        '电影院管理',
                        '电影院列表',
                        '放映厅列表',
                        '新增排片计划',
                    ],
                },
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
