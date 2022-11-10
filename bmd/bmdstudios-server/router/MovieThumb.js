/**  定义剧照模块相关的接口 */
const express = require('express')
const router = express.Router()  
const Joi = require('joi')
const Response = require('../utils/Response.js')

// 引入mysql连接池   
const pool = require('../utils/db.js')

/**
 * 添加剧照接口
 * @param: 
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post('/movie-thumb/add', async (req, resp)=>{
    let {url, movie_id} = req.body   // post请求参数在req.body中

    // 表单验证
    let schema = Joi.object({
        url: Joi.string().required(),    // 必填
        movie_id: Joi.string().required()   // 必填
    })
    let {error, value} = schema.validate(req.body)
    if(error){
        resp.send(Response.error(400, error))
        return; // 结束
    }

    try{
        // 表单验证通过，执行添加操作
        let sql = 'insert into movie_thumb (url, movie_id) values (?,?)'
        await pool.querySync(sql, [url, movie_id])
        // 查询所有剧照
        let sql3 = "select url from movie_thumb where movie_id = ?"
        let result = await pool.querySync(sql3, [movie_id])
        // result结构: [{url:xxx}, {url:xxx}...]   希望得到: ["url1", "url2", "url3"...]
        let thumbs = []
        result.forEach(item=>{
            thumbs.push(item.url)
        })
        // 将剧照列表转成json，写入movie_desc
        let sql4 = "update movie_desc set thumb = ? where movieid = ?"
        await pool.querySync(sql4, [JSON.stringify(thumbs), movie_id])
        
        resp.send(Response.ok())
    }catch(error){
        resp.send(Response.error(500, error))
        throw error;
    }
    

})

/**
 * 删除剧照接口
 * @param:
 *   id:   剧照id
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post('/movie-thumb/del',async (req, resp)=>{
    let {id} = req.body

    // 表单验证
    let schema = Joi.object({
        id: Joi.string().required(),    // 必填
    })
    let {error, value} = schema.validate(req.body)
    if(error){
        resp.send(Response.error(400, error))
        return; // 结束
    }

    try{
        // 先查询该剧照所属电影id
        let sql1 = "select movie_id from movie_thumb where id = ?"
        let r1 = await pool.querySync(sql1, [id])
        if(r1.length == 0){
            throw new Error("删除失败，没有该id的记录。");
        }
        let movie_id = r1[0].movie_id;
        // 执行删除业务
        let sql2 = "delete from movie_thumb where id = ?";
        await pool.querySync(sql2, [id])
        // 查询所有剧照
        let sql3 = "select url from movie_thumb where movie_id = ?"
        let result = await pool.querySync(sql3, [movie_id])
        // result结构: [{url:xxx}, {url:xxx}...]   希望得到: ["url1", "url2", "url3"...]
        let thumbs = []
        result.forEach(item=>{
            thumbs.push(item.url)
        })
        // 将剧照列表转成json，写入movie_desc
        let sql4 = "update movie_desc set thumb = ? where movieid = ?"
        await pool.querySync(sql4, [JSON.stringify(thumbs), movie_id])
        resp.send(Response.ok())
    }catch(error){
        resp.send(Response.error(500, error))
        throw error;
    }
})

/**
 * 通过movie_id查询所有剧照接口
 * @param:
 *   movie_id:   电影id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
 router.get('/movie-thumbs/movieid', (req, resp)=>{
    let {movie_id} = req.query
    // 表单验证
    let schema = Joi.object({
        movie_id: Joi.string().required(),    // 必填
    })
    let {error, value} = schema.validate(req.query)
    if(error){
        resp.send(Response.error(400, error))
        return; // 结束
    }
  
    // 执行查询业务
    let sql = 'select * from movie_thumb where movie_id=?'
    pool.query(sql, [movie_id], (error, result)=>{
      if(error){
        resp.send(Response.error(500, error))
        throw error;
      }
      resp.send(Response.ok(result))
    })
  
  })

// 将router对象导出
module.exports = router;