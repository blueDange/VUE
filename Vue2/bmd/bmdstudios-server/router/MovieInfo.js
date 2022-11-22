/**  定义电影演员相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 添加电影接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/movie-info/add", (req, resp) => {
  let {
    categoryId,
    cover,
    title,
    type,
    starActor,
    showingon,
    score,
    description,
    duration,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    categoryId: Joi.number().required(),
    cover: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    starActor: Joi.string().required(),
    showingon: Joi.string().required(),
    score: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `insert into movie_info 
        (category_id, cover, title, type, star_actor, showingon, score, description, duration) 
            values 
        (?,?,?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [
      categoryId,
      cover,
      title,
      type,
      starActor,
      showingon,
      score,
      description,
      duration,
    ],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      // 获取当前添加电影的ID，并新增movie_desc表
      let insertId = result.insertId
      let sql2 = 'insert into movie_desc (movieid, description) values (?, ?)';
      pool.query(sql2, [insertId, description], (error2, result2) => {
        if (error2) {
          resp.send(Response.error(500, error2));
          throw error2;
        }
        resp.send(Response.ok());
      })
    }
  );
});

/**
 * 查询所有的电影类型
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.get("/movie-types", (req, resp) => {
  let sql = "select * from movie_type";
  pool.query(sql, (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  });
});

/**
 * 通过类别ID查询所有电影
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
 router.get("/movie-infos/category", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { page, pagesize, cid } = req.query;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    cid: Joi.number().required(), // cid必须是数字，必填
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    cid = parseInt(cid);
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from movie_info where category_id=? limit ?,?";
    console.log(`------------------------select * from movie_info where category_id=${cid} limit ${startIndex},${size}---------------------------`)
    let result = await pool.querySync(sql, [cid, startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from movie_info where category_id=?";
    let result2 = await pool.querySync(sql2, [cid]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});


/**
 * 查询所有电影
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.get("/movie-infos", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { page, pagesize } = req.query;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from movie_info limit ?,?";
    let result = await pool.querySync(sql, [startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from movie_info";
    let result2 = await pool.querySync(sql2, [startIndex, size]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});

/**
 * 通过电影名称关键字模糊查询所有电影
 * @param:
 *   详见接口文档 {name:xx, page:1, pagesize:10}
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
 router.post("/movie-infos/name", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let {name, page, pagesize } = req.body;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    name: Joi.string().required(), // name必须是数字，必填
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from movie_info where title like ? limit ?,?";
    let result = await pool.querySync(sql, [`%${name}%`, startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from movie_info where title like ?";
    let result2 = await pool.querySync(sql2, [`%${name}%`]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});


/**
 * 删除电影接口
 * @param:
 *   id:   电影id
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/movie-info/del", (req, resp) => {
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
  let sql = "delete from movie_info where id = ?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    pool.query('delete from movie_desc where movieid=?', [id], (error2, result2) => {
      if (error2) {
        resp.send(Response.error(500, error2));
        throw error2;
      }
      resp.send(Response.ok());
    })
  });
});

/**
 * 通过ID查询电影接口
 * @param:
 *   id:   电影id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
router.get("/movie-info/query", (req, resp) => {
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
  let sql = `select 
              mi.id id,
              mi.category_id category_id,
              mi.cover cover,
              mi.title title,
              mi.type type,
              mi.star_actor star_actor,
              mi.showingon showingon,
              mi.score score,
              mi.duration duration,
              md.description description,
              md.director director,
              md.actor actor,
              md.thumb thumb
            from movie_info mi join movie_desc md on mi.id=md.movieid where mi.id=? LIMIT 0,1;`;
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
 * 更新电影信息接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/movie-info/update", (req, resp) => {
  let {
    id,
    category_id,
    cover,
    title,
    type,
    star_actor,
    showingon,
    score,
    description,
    duration,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(),
    category_id: Joi.number().required(),
    cover: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    star_actor: Joi.string().required(),
    showingon: Joi.string().required(),
    score: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
  });
  let { error, value } = schema.validate(req.body, {allowUnknown: true});
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行更新电影信息操作
  let sql = `update movie_info set category_id=?, cover=?, title=?, type=?, star_actor=?, showingon=?, score=?, description=?, duration=? where id=?`;
  pool.query(
    sql,
    [
      category_id,
      cover,
      title,
      type,
      star_actor,
      showingon,
      score,
      description,
      duration,
      id,
    ],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      // 修改基本信息成功，将简介更新到movie_desc表
      pool.query('update movie_desc set description=? where movieid=?', [description, id], (error2, result2)=>{
        if (error2) {
          resp.send(Response.error(500, error2));
          throw error2;
        }
        resp.send(Response.ok());
      })
    }
  );
});

/**
 * 为电影绑定演员列表接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/movie-info/bind-actors", async (req, resp) => {
  let { movie_id, actor_ids } = req.body;

  // 表单验证
  let schema = Joi.object({
    movie_id: Joi.string().required(), // 必填
    actor_ids: Joi.allow(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }
  try {
    // 执行sql，将当前movie_id的数据全部删除
    let sql1 = 'delete from movie_info_map_actor where movie_id=?'
    await pool.querySync(sql1, [movie_id])

    if(!actor_ids){
      resp.send(Response.ok());
      return;
    }

    // 执行sql，将movie_id与actor_id绑定在一起，全部插入数据库
    let params = ""
    let paramsArray = []
    let ids = actor_ids.split(',') // 所有的演员ID
    for(let i=0; i<ids.length; i++){
      params += "(?,?),"
      paramsArray.push(movie_id)
      paramsArray.push(ids[i])
    }
    let sql2 = 'insert into movie_info_map_actor (movie_id, actor_id) values ' + params
    sql2 = sql2.substring(0, sql2.length-1)
    await pool.querySync(sql2, paramsArray)
    resp.send(Response.ok());
  } catch (error) {
    resp.send(Response.error(500, error));
  }

});

// 将router对象导出
module.exports = router;
