/**  定义电影院相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 删除电影院接口
 * @param:
 *   id:   影院id
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post("/cinema/del", (req, resp) => {
  let { id } = req.body;

  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行删除业务
  let sql = "delete from movie_cinema where id = ?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  });
});

/**
 * 通过ID查询电影院接口
 * @param:
 *   id:   电影院id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
 router.get("/cinema/query", (req, resp) => {
  let { id } = req.query;
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询业务
  let sql = "select * from movie_cinema where id=?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    if (result && result.length == 0) {
      // 没查到
      resp.send(Response.ok(null));
    } else {
      resp.send(Response.ok(result[0]));
    }
  });
});

/**
 * 查询所有电影院
 * @param:
 *   无
 * @return:
 *   {code:200, msg:'ok', data:[{}]}
 */
router.get('/cinemas', (req, resp)=>{
  let sql ="select * from movie_cinema"
  pool.query(sql, (error, result)=>{
    if(error){
      resp.send(Response.error(500, error))
      throw error;
    }
    resp.send(Response.ok(result))
  })
})

/**
 * 通过日期与电影ID查询有该电影排期的电影院列表
 * 
 */
router.get('/cinemas/date', (req, resp)=>{
  let {showingon_date, movie_id} = req.query
  // 表单验证
  let schema = Joi.object({
    showingon_date: Joi.string().required(),
    movie_id: Joi.string().required()
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询
  let sql = `SELECT
    mc.id id,
    mc.cinema_name cinema_name,
    mc.address address,
    mc.province province,
    mc.city city,
    mc.district district,
    mc.longitude longitude,
    mc.latitude latitude,
    mc.tags tags
  FROM
    movie_cinema mc join showingon_plan sp on mc.id=sp.cinema_id
  WHERE
    sp.movie_id=? and sp.showingon_date=? and status=1
  GROUP BY
    mc.id`

  pool.query(sql, [movie_id, showingon_date], (error, result)=>{
    if(error){
      resp.send(Response.error(500, error))
      throw error;
    }
    resp.send(Response.ok(result))
  })
})

/**
 * 查询所有电影院的标签
 * @param:
 *   无
 * @return:
 *   {code:200, msg:'ok', data:[{}]}
 */
router.get('/cinema/tags', (req,resp)=>{
  let sql = "select * from movie_cinema_tag"
  pool.query(sql, (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  })
})

/**
 * 添加电影院接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/cinema/add", (req, resp) => {
  let {
    cinema_name,
    address,
    province,
    city,
    district,
    longitude,
    latitude,
    tags,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    cinema_name: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    tags: Joi.string().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `insert into movie_cinema (
      cinema_name,
      address,
      province,
      city,
      district,
      longitude,
      latitude,
      tags) values (?,?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [cinema_name, address, province, city, district, longitude, latitude, tags],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      resp.send(Response.ok());
    }
  );
});

/**
 * 修改电影院接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post("/cinema/update", (req, resp) => {
  let {
    id,
    cinema_name,
    address,
    province,
    city,
    district,
    longitude,
    latitude,
    tags,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(),
    cinema_name: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    tags: Joi.string().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `update movie_cinema set 
      cinema_name=?, 
      address=?, 
      province=?, 
      city=?, 
      district=?, 
      longitude=?, 
      latitude=?, 
      tags=?
    where id=?`;
  pool.query(
    sql,
    [cinema_name, address, province, city, district, longitude, latitude, tags, id],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      resp.send(Response.ok());
    }
  );
});


// 将router对象导出
module.exports = router;
