import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/** 引入全局变量,方便组件调用模块API */
import httpApi from '@/http/index'
// 将引入的接口API模块,注入Vue原型链
// 在组件中可以使用 this.$http 访问API接口
Vue.prototype.$http = httpApi

Vue.config.productionTip = false

const vm = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
