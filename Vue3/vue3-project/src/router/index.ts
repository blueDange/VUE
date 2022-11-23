import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/computed',
    name: 'computed',
    component: () => import( '../views/Computed.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import( '../views/Watch.vue')
  },
  {
    path: '/method',
    name: 'method',
    component: () => import( '../views/Method.vue')
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import( '../views/Setup.vue')
  },
  {
    path: '/axios',
    name: 'axios',
    component: () => import( '../views/Axios.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
