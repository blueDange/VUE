import myaxios from "../MyAxios";
// 引入路径前缀
import BASEURL from '../BaseUrl' 
const {BMDURL} = BASEURL

const cinemaRoomApi = {


  /**
   * 删除放映厅接口
   * @param {Object} params {id:4}
   */
  delete(params:object){
    return myaxios.post(BMDURL + "/cinema-room/del", params)
  },

  /**
   * 添加放映厅接口
   * @param {Object} params 详见接口文档
   */
  add(params:object) {
    return myaxios.post(BMDURL + "/cinema-room/add", params);
  },

  /**
   * 根据影院ID查询所有放映厅
   */
  list(params:object){
    return myaxios.get(BMDURL + "/cinema-rooms/cinemaid", params)
  },

  /**
   * 查询所有放映厅类型
   */
  queryAllTypes() {
    return myaxios.get(BMDURL + "/cinema-room/types");
  },

  /**
   * 修改座位模板
   */
  updateSeatTemplate(params:object){
    return myaxios.post(BMDURL + "/cinema-room/edit-seat-template", params)
  },

  /**
   * 通过ID所有放映厅信息
   */
   queryById(params:object) { 
    return myaxios.get(BMDURL + "/cinema-room/query", params);
  },

};

export default cinemaRoomApi;
