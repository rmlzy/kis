"use strict";

const Controller = require("egg").Controller;

class AdminController extends Controller {
  async renderLogin() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    await ctx.render("admin/login.html", {
      code,
    });
  }

  async renderBlogs() {
    const { ctx, service } = this;
    let blogs = [];
    try {
      blogs = await service.blog.findAll({
        order: [["updatedAt", "DESC"]],
      });
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/blogs.html", {
      currentNav: "blog",
      blogs,
    });
  }

  async renderTags() {
    const { ctx, service } = this;
    let tags = [];
    try {
      tags = await service.tag.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/tags.html", {
      currentNav: "tag",
      tags,
    });
  }

  async renderUsers() {
    const { ctx, service } = this;
    let users = [];
    try {
      users = await service.user.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/users.html", {
      currentNav: "user",
      users,
    });
  }

  async renderCategories() {
    const { ctx, service } = this;
    let categories = [];
    try {
      categories = await service.category.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/categories.html", {
      currentNav: "category",
      categories,
    });
  }

  async renderWrite() {
    const { ctx, service } = this;
    const { id } = ctx.request.query;
    let categories = [];
    let tags = [];
    try {
      categories = await service.category.findAll();
      tags = await service.tag.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/write.html", {
      currentNav: "write",
      id,
      categories,
      tags,
    });
  }

  async renderVisitors() {
    const { ctx, service } = this;
    let visitors = [];
    try {
      visitors = await service.visitor.findAll();
    } catch (e) {
      // ignore
    }
    await ctx.render("admin/visitors.html", {
      currentNav: "visitor",
      visitors,
    });
  }
}

module.exports = AdminController;
