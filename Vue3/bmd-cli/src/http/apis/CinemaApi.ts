import myaxios from "../MyAxios";
// 引入路径前缀
import BASEURL from '../BaseUrl' 
const {BMDURL} = BASEURL

const cinemaApi = {


  /**
   * 删除电影院接口
   * @param {Object} params {id:4}
   */
  delete(params:object){
    return myaxios.post(BMDURL + "/cinema/del", params)
  },

  /**
   * 添加电影院接口
   * @param {Object} params 详见接口文档
   */
  add(params:object) {
    return myaxios.post(BMDURL + "/cinema/add", params);
  },

  /**
   * 查询所有电影院
   */
  list(){
    return myaxios.get(BMDURL + "/cinemas")
  },

  /**
   * 查询所有影院标签
   */
  queryAllTags() {
    return myaxios.get(BMDURL + "/cinema/tags");
  },

  /**
   * 查询通过ID查询电影院
   * @param:
   *   params: 存放影院ID的对象  {id:2}
   */
  queryById(params:object) {
    return myaxios.get(BMDURL + "/cinema/query", params);
  },

  /**
   * 通过id修改影院信息
   * @param {Object} params 详情参考接口文档
   */
  update(params:object){
    return myaxios.post(BMDURL + "/cinema/update", params);
  },

};

export default cinemaApi;
