import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonView from '../views/PersonView.vue'
import Slot from '../App插槽-slot'
import SlotName from '../App插槽-slot2'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/axios',  // 访问新页面
    name: 'axios',
    component: PersonView
  },
  {
    path: '/Slot',  // 访问新页面
    name: 'slot',
    component: Slot
  },
  {
    path: '/SlotName',  // 访问新页面
    name: 'slotname',
    component: SlotName
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
