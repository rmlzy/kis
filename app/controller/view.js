"use strict";

const Controller = require("egg").Controller;
const dayjs = require("dayjs");

class FrontViewController extends Controller {
  async render404() {
    await this.ctx.render("404.html");
  }

  async renderHome() {
    const { ctx, service } = this;
    let blogs = [];
    try {
      const topped = await service.blog.findAll({
        order: [["createdAt", "DESC"]],
        where: { status: "TOP" },
      });
      const published = await service.blog.findAll({
        order: [["createdAt", "DESC"]],
        where: { status: "PUBLISHED" },
      });
      blogs = [...topped, ...published];
      blogs = blogs
        .map((el) => el.get({ plain: true }))
        .map((blog) => {
          blog.createdAt = dayjs(blog.createdAt).format("MMMM D, YYYY");
          blog.readTime = ctx.helper.calcReadTime(blog.content.length);
          return blog;
        });
    } catch (e) {
      // ignore
    }
    await ctx.render("home.html", {
      currentNav: "home",
      blogs,
    });
  }

  async renderBlog() {
    const { ctx, service, config } = this;
    const { secret } = ctx.request.query;
    const { pathname } = ctx.params;
    let blog = {};
    try {
      blog = await service.blog.findOne({ where: { pathname } });
      if (!blog) {
        await ctx.redirect("/404.html");
        return;
      }
      blog = blog.get({ plain: true });
      blog.createdAt = dayjs(blog.createdAt).format("MMMM D, YYYY");
      blog.readTime = ctx.helper.calcReadTime(blog.content.length);
      if (blog.type === "MARKDOWN") {
        blog.content = ctx.helper.md2html(blog.content);
      }

      // Limit for Tian
      const isRightSecret = ctx.helper.md5(config.tianSecret) === secret;
      if (blog.Category && blog.Category.pathname === "letter-to-Tian") {
        blog.limited = true;
      }
      if (isRightSecret) {
        blog.limited = false;
      }
    } catch (e) {
      // ignore
    }
    ctx.runInBackground(async () => {
      await ctx.service.blog.update({ readCount: blog.readCount + 1 }, { where: { pathname } });
    });
    await ctx.render("blog.html", {
      currentNav: "home",
      title: blog.title,
      blog,
    });
  }
}

module.exports = FrontViewController;
