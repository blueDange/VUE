// 该文件存放演员模块相关的接口API
import myaxios from '../MyAxios'
// 引入路径前缀
import BASEURL from '../BaseUrl'
const { BMDURL } = BASEURL

const actorApi = {
    // 新增演员
    add(params) {
        return myaxios.post(BMDURL + '/movie-actor/add', params)
    },

    // 通过姓名模糊查询演员列表
    queryByNameLike(params) {
        return myaxios.post(BMDURL + '/movie-actors/name', params)
    },

    //删除演员
    delete(params) {
        return myaxios.post(BMDURL + '/movie-actor/del', params)
    },

    // 查询所有演员
    queryAll() {
        let url = BMDURL + '/movie-actors'
        let params = { page: 1, pagesize: 20 }
        return myaxios.get(url, params)
    },
}

export default actorApi
