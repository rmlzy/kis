"use strict";

const dayjs = require("dayjs");

module.exports = () => {
  const today = dayjs();

  return async function (ctx, next) {
    ctx.locals.version = ctx.app.config.version;
    ctx.locals.title = ctx.app.config.title;
    ctx.locals.rmlzy = ctx.app.config.rmlzy;
    ctx.locals.poppy = ctx.app.config.poppy;
    ctx.locals.subtitle = ctx.app.config.subtitle;
    ctx.locals.description = ctx.app.config.description;
    ctx.locals.author = ctx.app.config.author;
    ctx.locals.copyright = ctx.app.config.copyright;
    ctx.locals.fallInLove = ctx.app.config.fallInLoveAt;

    const fallInLoveDate = dayjs(ctx.app.config.fallInLoveAt);
    ctx.locals.fallInLove = today.diff(fallInLoveDate, "day");
    await next();
  };
};
