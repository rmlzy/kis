"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.get("/", controller.view.renderHome);
  router.get("/404.html", controller.view.render404);
  router.get("/blog/:pathname.html", controller.view.renderBlog);
  router.get("/category/:id.html", controller.view.renderCategory);
};
