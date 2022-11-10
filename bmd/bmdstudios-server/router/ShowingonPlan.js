/**  定义电影院放映厅相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");
var moment = require('moment');

/**
 * 通过room_id查询放映厅的所有排片计划接口
 * @param:
 *   id:   放映厅id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
router.get("/plans/roomid", (req, resp) => {
  let { room_id } = req.query;
  // 表单验证
  let schema = Joi.object({
    room_id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }
  // 执行查询业务
  let sql = `select 
    sp.id plan_id,
    sp.cinema_id cinema_id,
    sp.cinema_room_id cinema_room_id,
    sp.movie_id movie_id,
    mi.title title,
    sp.showingon_date showingon_date,
    sp.showingon_time showingon_time,
    sp.status status,
    sp.price price
  from 
    showingon_plan sp join movie_info mi on sp.movie_id=mi.id
  where 
    cinema_room_id=? and showingon_date>=? 
  ORDER BY 
    showingon_date desc, showingon_time`;

  let time = moment().format('YYYY-MM-DD')
  console.log(`room_id:`+room_id)
  console.log(`time:`+room_id)
  
  pool.query(sql, [room_id, time], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  });
});

/**
 * 通过影院ID，日期，电影ID查询所有排片计划
 * @param:
 *   id:   放映厅id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
 router.get("/plans/cinema-movie-plans", (req, resp) => {
  let { cinema_id, showingon_date, movie_id } = req.query;
  // 表单验证
  let schema = Joi.object({
    cinema_id: Joi.string().required(), // 必填
    showingon_date: Joi.string().required(), // 必填
    movie_id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }
  // 执行查询业务
  let sql = ` select 
    sp.id id,
    sp.showingon_date showingon_date,
    sp.showingon_time showingon_time,
    sp.price price,
    mcr.room_type room_type,
    mi.duration duration,
    mcr.room_size room_size
  from 
    showingon_plan sp 
      join movie_info mi on sp.movie_id=mi.id 
      join movie_cinema mc on sp.cinema_id = mc.id
      join movie_cinema_room mcr on sp.cinema_room_id=mcr.id
  where 
    sp.cinema_id=? and showingon_date=? and movie_id=?
  ORDER BY
    showingon_date`;

  pool.query(sql, [cinema_id,showingon_date, movie_id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  });
});

/**
 * 添加排片计划接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/plan/add", async (req, resp) => {
  let {
    cinema_id,
    cinema_room_id,
    movie_id,
    showingon_date,
    showingon_time,
    status,
    price,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    cinema_id: Joi.number().required(),
    cinema_room_id: Joi.number().required(),
    movie_id: Joi.number().required(),
    showingon_date: Joi.string()
      .required()
      .pattern(new RegExp("\\d{4}-\\d{2}-\\d{2}")),
    showingon_time: Joi.string()
      .required()
      .pattern(new RegExp("\\d{2}:\\d{2}")),
    status: Joi.number().required(),
    price: Joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  try {
    // 查询放映厅的座位模板
    let sql = `select seat_template from movie_cinema_room where id=?`;
    let result = await pool.querySync(sql, [cinema_room_id])
    if(result.length==0) {
      throw new Error('找不到该放映厅的信息')
    }
    console.log(result)
    let seat_template = result[0].seat_template
    sql = `insert into showingon_plan (
      cinema_id,
      cinema_room_id,
      movie_id,
      showingon_date,
      showingon_time,
      status,
      price,
      seat_template) values (?,?,?,?,?,?,?,?)`;
    await pool.querySync(sql,[cinema_id, cinema_room_id, movie_id, showingon_date, showingon_time, status, price, seat_template]);
    resp.send(Response.ok());
  } catch (error) {
    resp.send(Response.error(500, error));
    throw error;
  }

  // 表单验证通过，执行添加操作
  sql = `insert into showingon_plan (
    cinema_id,
    cinema_room_id,
    movie_id,
    showingon_date,
    showingon_time,
    status,
    price,
    seat_template) values (?,?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [
      cinema_id,
      cinema_room_id,
      movie_id,
      showingon_date,
      showingon_time,
      status,
      price,
      seat_template
    ],
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
 * 删除排片计划接口
 */
router.post("/plan/del", (req, resp) => {
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

  // 执行删除排片计划业务
  let sql = "delete from showingon_plan where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  })
});

/**
 * 修改排片计划接口
 */
router.post("/plan/publish", (req, resp) => {
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

  // 执行将排片计划设置为发布状态业务
  let sql = "update showingon_plan set status=1 where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  })
});


// 执行将排片计划设置为未发布状态业务
router.post("/plan/no-publish", (req, resp) => {
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

  // 执行将排片计划设置为发布状态业务
  let sql = "update showingon_plan set status=0 where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  })
});

// 将router对象导出
module.exports = router;
