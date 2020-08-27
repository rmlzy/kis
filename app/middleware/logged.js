"use strict";

module.exports = () => {
  return async function logged(ctx, next) {
    const jwtToken = ctx.headers["token"];
    if (!jwtToken) {
      ctx.logger.error("logged 用户权限拦截: ", jwtToken);
      ctx.status = 403;
      ctx.body = { success: false, message: "未检测到 TOKEN" };
      return;
    }

    const userId = ctx.helper.getLoggedIdByToken(jwtToken);
    if (userId) {
      await next();
      return;
    }
    ctx.status = 403;
    ctx.body = { success: false, message: "未检测到 TOKEN" };
  };
};
