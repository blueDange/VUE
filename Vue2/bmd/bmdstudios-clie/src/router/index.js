import store from '@/store'
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
                path: 'showingonplan-add/:room_id',
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
            {
                path: 'showingonplan-list/:room_id',
                name: '/home/showingonplan-list', // 不重复即可
                component: () => import('../views/cinema/ShowingonPlanList'),
                meta: {
                    nav: ['电影院管理', '电影院列表', '放映厅列表', '排片管理'],
                },
            },
            {
                path: 'seat-template/:room_id',
                name: '/home/seat-template', // 不重复即可
                component: () =>
                    import('../views/cinema/CinemaRoomSeatTemplate.vue'),
                meta: {
                    nav: [
                        '电影院管理',
                        '电影院列表',
                        '放映厅列表',
                        '配置座位模板',
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
        path: '/user/login',
        name: '/user/login',
        component: () => import('../views/user/Login.vue'),
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

// 全局前置导航守卫,每当路由跳转到目标组件之前会自动执行箭头函数
router.beforeEach((to, from, next) => {
    console.log('from', from)
    console.log('to', to)
    // 判断目标地址是否是/user/login
    if (to.path == '/user/login') {
        next() // 向后继续执行
    } else {
        // 如果不是跳转到登录页面,则需要验证vuex中是否有登录用户
        if (store.state.user) {
            // 如果已经登录,可以跳转
            next()
        } else {
            // 如果没有登录,则强制跳转到登录页
            router.push('/user/login')
        }
    }
})

export default router
