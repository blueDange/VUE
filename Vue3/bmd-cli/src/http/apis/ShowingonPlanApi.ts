import myaxios from "../MyAxios";
// 引入路径前缀
import BASEURL from '../BaseUrl' 
const {BMDURL} = BASEURL

const showingonPlanApi = {
  /**
   * 添加排片计划接口
   * @param {Object} params
   */
  add(params:object) {
    return myaxios.post(BMDURL + "/plan/add", params);
  },

  /**
   * 通过roomId，查询排片计划列表
   * @param {Object} params {room_id: 1}
   */
  queryByRoomId(params:object) {
    return myaxios.get(BMDURL + "/plans/roomid", params);
  },

  /**
   * 根据ID删除排片计划
   * @param {Object} params  {id:1}
   */
  delete(params:object) {
    return myaxios.post(BMDURL + "/plan/del", params);
  },

  /**
   * 发布排片计划
   * @param {Object} params  {id:1}
   */
  publish(params:object) {
    return myaxios.post(BMDURL + "/plan/publish", params);
  },

  /**
   * 将排片计划设置为未发布状态
   * @param {Object} params  {id:1}
   */
  noPublish(params:object) {
    return myaxios.post(BMDURL + "/plan/no-publish", params);
  },
};

export default showingonPlanApi;
