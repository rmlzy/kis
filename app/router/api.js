"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, middleware, controller } = app;
  const { logged } = middleware;
  const v = "v1";

  // Common
  router.get(`/api/${v}/captcha`, controller.common.genCaptcha);
  router.post(`/api/${v}/login`, controller.common.login);
  router.post(`/api/${v}/upload`, logged(), controller.common.upload);
  router.post(`/api/${v}/check-token`, controller.common.checkToken);
  router.post(`/api/${v}/check-tian-secret`, controller.blog.checkTianSecret);

  // User
  router.get(`/api/${v}/user-info`, logged(), controller.user.info);
  router.get(`/api/${v}/user`, logged(), controller.user.list);
  router.get(`/api/${v}/user/:id`, logged(), controller.user.detail);
  router.post(`/api/${v}/user`, logged(), controller.user.create);
  router.put(`/api/${v}/user/:id`, logged(), controller.user.update);
  router.delete(`/api/${v}/user/:id`, logged(), controller.user.delete);
  router.put(`/api/${v}/user/:id/level`, logged(), controller.user.setLevel);
  router.put(`/api/${v}/user/:id/status`, logged(), controller.user.setStatus);

  // Blog
  router.get(`/api/${v}/blog`, logged(), controller.blog.list);
  router.get(`/api/${v}/blog/:id`, controller.blog.detail); // 文章详情无需权限拦截
  router.post(`/api/${v}/blog`, logged(), controller.blog.create);
  router.put(`/api/${v}/blog/:id`, logged(), controller.blog.update);
  router.delete(`/api/${v}/blog/:id`, logged(), controller.blog.delete);
  router.put(`/api/${v}/blog/:id/like`, controller.blog.like);
  router.put(`/api/${v}/blog/:id/dislike`, controller.blog.dislike);

  // Tag
  router.get(`/api/${v}/tag`, logged(), controller.tag.list);
  router.get(`/api/${v}/tag/:id`, logged(), controller.tag.detail);
  router.post(`/api/${v}/tag`, logged(), controller.tag.create);
  router.put(`/api/${v}/tag/:id`, logged(), controller.tag.update);
  router.delete(`/api/${v}/tag/:id`, logged(), controller.tag.delete);

  // Category
  router.get(`/api/${v}/category`, logged(), controller.category.list);
  router.get(`/api/${v}/category/:id`, logged(), controller.category.detail);
  router.post(`/api/${v}/category`, logged(), controller.category.create);
  router.put(`/api/${v}/category/:id`, logged(), controller.category.update);
  router.delete(`/api/${v}/category/:id`, logged(), controller.category.delete);
};
