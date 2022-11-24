/** 该文件仅存放演员模块相关的接口API */
import myaxios from '../MyAxios'
// 引入路径前缀
import BASEURL from '../BaseUrl'
const { BMDURL } = BASEURL

const actorApi = {
    /**
     * 新增演员
     * @param {Object} params {actorName:名字, actorAvatar:头像路径}
     */
    add(params: object) {
        return myaxios.post(BMDURL + '/movie-actor/add', params)
    },

    /**
     * 通过姓名模糊查询演员列表
     * @param {Object} params  {name:姓名关键字}
     */
    queryByNameLike(params: object) {
        return myaxios.post(BMDURL + '/movie-actors/name', params)
    },

    /**
     * 删除演员
     * @param {Object} params {id:演员ID}
     */
    delete(params: object) {
        return myaxios.post(BMDURL + '/movie-actor/del', params)
    },

    /** 查询所有演员 */
    queryAll() {
        let params = { page: 1, pagesize: 100 }
        return myaxios.get(BMDURL + '/movie-actors', params)
    },
}

export default actorApi
