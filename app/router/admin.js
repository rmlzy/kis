"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, middleware, controller } = app;
  const { logged } = middleware;

  router.get("/admin/login.html", controller.view.admin.renderLogin);
  router.get("/admin/dashboard.html", logged(), controller.view.admin.renderBlogs);
  router.get("/admin/blogs.html", logged(), controller.view.admin.renderBlogs);
  router.get("/admin/tags.html", logged(), controller.view.admin.renderTags);
  router.get("/admin/users.html", logged(), controller.view.admin.renderUsers);
  router.get("/admin/categories.html", logged(), controller.view.admin.renderCategories);
  router.get("/admin/write.html", logged(), controller.view.admin.renderWrite);
  router.get("/admin/visitors.html", logged(), controller.view.admin.renderVisitors);
};
