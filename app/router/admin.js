"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, middleware, controller } = app;
  const { logged } = middleware;

  router.get("/admin/login.html", controller.view.admin.renderLogin);
  router.get("/admin/dashboard.html", logged(), controller.view.admin.renderDashboard);
  router.get("/admin/blogs.html", logged(), controller.view.admin.renderBlogs);
  router.get("/admin/tags.html", logged(), controller.view.admin.renderTags);
  router.get("/admin/users.html", logged(), controller.view.admin.renderUsers);
  router.get("/admin/categories.html", logged(), controller.view.admin.renderCategories);
  router.get("/admin/write.html", logged(), controller.view.admin.renderWrite);

  // Common
  router.post("/api/v1/getFullUrlByBlogTitle", controller.api.common.getFullUrlByBlogTitle);
  router.get("/api/v1/captcha", controller.api.common.generateImageCaptcha);
  router.post("/api/v1/login", controller.api.common.login);

  // User
  router.get("/api/v1/user/:id", logged(), controller.api.user.detail);
  router.post("/api/v1/user", logged(), controller.api.user.create);
  router.put("/api/v1/user/:id", logged(), controller.api.user.update);
  router.delete("/api/v1/user/:id", logged(), controller.api.user.delete);
  router.put("/api/v1/user/:id/level", logged(), controller.api.user.setLevel);
  router.put("/api/v1/user/:id/status", logged(), controller.api.user.setStatus);

  // Blog
  router.get("/api/v1/blog/:id", logged(), controller.api.blog.detail);
  router.post("/api/v1/blog", logged(), controller.api.blog.create);
  router.put("/api/v1/blog/:id", logged(), controller.api.blog.update);
  router.delete("/api/v1/blog/:id", logged(), controller.api.blog.delete);
  router.put("/api/v1/blog/:id/like", controller.api.blog.like);
  router.put("/api/v1/blog/:id/dislike", controller.api.blog.dislike);

  // Tag
  router.get("/api/v1/tag/:id", logged(), controller.api.tag.detail);
  router.post("/api/v1/tag", logged(), controller.api.tag.create);
  router.put("/api/v1/tag/:id", logged(), controller.api.tag.update);
  router.delete("/api/v1/tag/:id", logged(), controller.api.tag.delete);

  // Category
  router.get("/api/v1/category/:id", logged(), controller.api.category.detail);
  router.post("/api/v1/category", logged(), controller.api.category.create);
  router.put("/api/v1/category/:id", logged(), controller.api.category.update);
  router.delete("/api/v1/category/:id", logged(), controller.api.category.delete);
};
