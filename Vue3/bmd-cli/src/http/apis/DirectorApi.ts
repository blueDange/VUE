/** 该文件仅存放导演模块相关的接口API */
import myaxios from "../MyAxios";
// 引入路径前缀
import BASEURL from '../BaseUrl' 
const {BMDURL} = BASEURL

const directorApi = {
  /**
   * 新增导演
   * @param {Object} params {directorName:名字, directorAvatar:头像路径}
   */
  add(params:object){
    return myaxios.post(BMDURL+'/movie-director/add', params)
  },

  /**
   * 通过姓名模糊查询导演列表
   * @param {Object} params  {name:姓名关键字}
   */
  queryByNameLike(params:object){
    return myaxios.post(BMDURL+'/movie-directors/name', params)
  },

  /**
   * 删除导演 
   * @param {Object} params {id:导演ID}
   */
  delete(params:object){
    return myaxios.post(BMDURL+'/movie-director/del', params)
  },

  /** 查询所有导演 */
  queryAll() {
    let params = { page: 1, pagesize: 100 };
    return myaxios.get(BMDURL+'/movie-directors', params);
  },

}

export default directorApi;