import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 此处用于存储全局共享的状态数据
    state: {
        // 登录成功后，存储token字符串
        token: sessionStorage.getItem('token'),
        cart: {}, // 购物车
        loc: '北京市', // 城市名称
        // user用于存储当前用户, 初始化赋值为storage中存储的用户
        user: sessionStorage.getItem('user')
            ? JSON.parse(sessionStorage.getItem('user'))
            : '',
    },

    // getters用于提供一些方法，方便的获取state中数据的临时计算结果
    // 类似vue中的计算属性：computed
    getters: {},
    // mutations用于提供一些方法，修改state中的状态数据
    mutations: {
        // 保存token
        saveToken(state, payload) {
            state.token = payload
            sessionStorage.setItem('token', payload)
        },

        updateUserInfo(state, payload) {
            // 将用户传过来的登录成功的use对象存入state.user
            state.user = payload
            // 存入vuex后还不够，还需要存入sessionStorage
            sessionStorage.setItem('user', JSON.stringify(payload))
        },
    },
    // actions用于提供一些方法，异步做了一些耗时任务后，
    // 修改state中的状态数据
    // (不能直接修改state，而是需要调用mutations中的方法，来修改state)
    actions: {
        // 接收参数，发送登录请求，得到结果后更新state
        // 将login方法定义在此处的好处就是，所有组件都可以随时调用
        login(store, payload) {
            // 执行异步任务，发送请求，得到结果后
            // store.commit('updateUserInfo', 用户对象)
        },
    },
    modules: {},
})
