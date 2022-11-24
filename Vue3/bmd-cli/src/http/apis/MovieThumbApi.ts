import myaxios from "../MyAxios";
// 引入路径前缀
import BASEURL from '../BaseUrl' 
const {BMDURL} = BASEURL

const movieThumbApi = {

    /**
     * 添加剧照接口
     * @param {Object} params 详见接口文档
     */
    add(params:object){
        return myaxios.post(BMDURL+'/movie-thumb/add', params)
    },

    /**
     * 查询相应电影id下的所有剧照
     * @param {Object} params 详见接口文档 page,pagesize
     */
    listByMovieId(params:object){
        return myaxios.get(BMDURL+'/movie-thumbs/movieid', params)
    },

    /**
     * 删除相应ID的剧照
     * @param {Object} params  {id:1}
     */
     delete(params:object){
        return myaxios.post(BMDURL+'/movie-thumb/del', params)
    },

}

export default movieThumbApi;