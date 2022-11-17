// 该文件存放演员模块相关的接口API
import myaxios from '../MyAxios'
// 引入路径前缀
import BASEURL from '../BaseUrl'
const { BMDURL } = BASEURL

const adminApi = {
    /**
     *
     * @param {Object} params {username,password}
     */
    login(params) {
        return myaxios.post(BMDURL + '/user/login', params)
    },
}

export default actorApi
