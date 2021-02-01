"use strict";

const Controller = require("egg").Controller;
const dayjs = require("dayjs");

class FrontViewController extends Controller {
  async _fetchBlogs(where) {
    const { service } = this;
    const condition = { order: [["createdAt", "DESC"]] };
    if (where) condition.where = where;
    const allBlogs = await service.blog.findAll(condition);
    const topped = [];
    const published = [];
    allBlogs.forEach((blog) => {
      if (blog.status === "TOP") {
        topped.push(blog);
      }
      if (blog.status === "PUBLISHED") {
        published.push(blog);
      }
    });
    return [...topped, ...published]
      .map((el) => el.get({ plain: true }))
      .map((blog) => {
        blog.createdAt = dayjs(blog.createdAt).format("YYYY年MM月DD日");
        return blog;
      });
  }

  async render404() {
    await this.ctx.render("front/404.html");
  }

  async renderHome() {
    const { ctx, service } = this;
    let blogs = [];
    let categories = [];
    try {
      blogs = await this._fetchBlogs();
      categories = await service.category.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("front/home.html", {
      blogs,
      categories,
    });
  }

  async renderCategory() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let blogs = [];
    let categories = [];
    try {
      blogs = await this._fetchBlogs({ categoryId: id });
      categories = await service.category.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("front/home.html", {
      blogs,
      categories,
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
      blog.createdAt = dayjs(blog.createdAt).format("YYYY年MM月DD日");
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
    await ctx.render("front/blog.html", {
      title: blog.title,
      blog,
    });
  }
}

module.exports = FrontViewController;
