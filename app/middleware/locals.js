"use strict";

const dayjs = require("dayjs");

module.exports = () => {
  const today = dayjs();

  return async function (ctx, next) {
    ctx.locals.version = ctx.app.config.version;
    ctx.locals.title = ctx.app.config.title;
    ctx.locals.subtitle = ctx.app.config.subtitle;
    ctx.locals.description = ctx.app.config.description;
    ctx.locals.author = ctx.app.config.author;

    const deployedDate = dayjs(ctx.app.config.firstDeployDate);
    ctx.locals.systemRunning = today.diff(deployedDate, "day");
    await next();
  };
};
