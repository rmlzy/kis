"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.get("/", controller.view.front.renderHome);
  router.get("/404.html", controller.view.front.render404);
  router.get("/blog/:pathname.html", controller.view.front.renderBlog);
  router.get("/category/:id.html", controller.view.front.renderCategory);
};
