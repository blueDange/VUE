/** 该文件仅存放电影模块相关的接口API */
import myaxios from '../MyAxios'
// 引入路径前缀
import BASEURL from '../BaseUrl'
const { BMDURL } = BASEURL

const movieApi = {
    /**
     * 通过ID，查询电影详情  params: {id:1}
     */
    queryById(params) {
        return myaxios.get(BMDURL + '/movie-info/query', params)
    },

    /**
     * 新增电影信息
     * @param {Object} params  {电影对象，详见接口文档}
     */
    add(params) {
        return myaxios.post(BMDURL + '/movie-info/add', params)
    },

    /**
     * 查询所有的电影类型
     */
    queryMovieTypes() {
        return myaxios.get(BMDURL + '/movie-types')
    },

    /**
     * 删除相应ID的电影信息
     * @param {Object} params  {id: 电影ID}
     */
    delete(params) {
        return myaxios.post(BMDURL + '/movie-info/del', params)
    },

    /**
     * 通过电影名称，实现模糊查询
     * @param {Object} params
     *        {name:关键字, page:当前第几页, pagesize:每页多少条}
     */
    queryByNameLike(params) {
        return myaxios.post(BMDURL + '/movie-infos/name', params)
    },

    /**
     * 查询所有电影（分页）
     * @param {Object} params  {page:1, pagesize:5}
     */
    queryAll(params) {
        return myaxios.get(BMDURL + '/movie-infos', params)
    },

    /**
     *
     * @param {Object} params {id:string,}
     * @returns
     */
    update(params) {
        return myaxios.post(BMDURL + '/movie-info/update', params)
    },
}

export default movieApi
