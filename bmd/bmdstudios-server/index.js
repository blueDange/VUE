const express = require("express");
const app = express();
const port = 3010; // 服务端口

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "JWT_SECRET_KEY";
const Response = require("./utils/Response.js");

// 配置跨域
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// 解析post请求参数
app.use(express.urlencoded());


// 自定义token全局验证中间件
const tokenTools = function (req, resp, next) {
  // 若请求路径是 /user/login 则不拦截，直接向后执行即可
  if(req.path=='/user/login'){
      next();
      return;
  }

  // 测试环境中，不做token拦截，直接执行后续业务
  if(1==1){
    next();
    return;
  }


  // 执行token验证
  let token = req.headers["authorization"];
  try {
    let payload = jwt.verify(token, JWT_SECRET_KEY);
    req.tokenPayload = payload  // 将token中存储的数据，直接复制给req，这样在后续业务中就可以使用req.tokenPayload获取这些信息
  } catch (error) {
    resp.send(Response.error(401, '用户验证失败，请重新登录'))
    return;
  }
  next(); // 继续后续业务的执行
};
app.use(tokenTools);



// 引入外部路由
app.use(require("./router/MovieActor.js"));
app.use(require("./router/MovieDirector.js"));
app.use(require("./router/MovieInfo.js"));
app.use(require("./router/MovieThumb.js"));
app.use(require("./router/Cinema.js"));
app.use(require("./router/CinemaRoom.js"));
app.use(require("./router/ShowingonPlan.js"));
app.use(require("./router/Admin.js"));

/**
 * 接口， 处理/请求
 */
app.get("/", (req, resp) => {
  resp.send("Hello World!");
});

app.listen(port, () => {
  console.log("百慕大影城后端服务已启动...");
});
