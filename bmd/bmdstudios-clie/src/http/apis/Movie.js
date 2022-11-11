// 该文件存放演员模块相关的接口API
import myaxios from '../MyAxios'
// 引入路径前缀
import BASEURL from '../BaseUrl'
const { BMDURL } = BASEURL

const movieApi = {
    /**
     *
     * @param {Object} params {page:1,pagesize:5}
     */
    queryAll(params) {
        return myaxios.get(BMDURL + '/movie-infos', params)
    },
}

export default movieApi
