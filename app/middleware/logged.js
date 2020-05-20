"use strict";

module.exports = () => {
  return async function logged(ctx, next) {
    const jwtToken = ctx.cookies.get("tk");

    if (!jwtToken) {
      ctx.logger.error("logged 用户权限拦截: ", jwtToken);
      ctx.redirect("/404.html");
      return;
    }

    const userId = ctx.helper.getLoggedIdByToken(jwtToken);
    if (userId) {
      await next();
      return;
    }
    ctx.redirect("/404.html");
  };
};
