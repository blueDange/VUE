/** 封装响应对象 */
const response = {

    /**
     * 返回正确的响应对象 {code:200, msg:'ok', data:data}
     * @param {Object} data 响应数据
     */
    ok : (data) => {
        return {
            code : 200,
            msg  : 'ok',
            data : data
        }
    },

    /**
     * 返回错误的响应对象  { code:400, msg: '错误消息' }
     * @param {number} code  状态码
     * @param {Object} errmsg  错误消息
     * @returns 
     */
    error : (code, errmsg) => {
        return {
            code : code,
            msg : errmsg
        }
    }

}

module.exports = response;