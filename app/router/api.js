"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, middleware, controller } = app;
  const { logged } = middleware;
  const v = "v1";

  // Common
  router.get(`/api/${v}/captcha`, controller.api.common.genCaptcha);
  router.post(`/api/${v}/login`, controller.api.common.login);
  router.post(`/api/${v}/upload`, logged(), controller.api.common.upload);
  router.post(`/api/${v}/check-token`, controller.api.common.checkToken);
  router.post(`/api/${v}/from-yuque`, controller.api.common.fromYuque);
  router.post(`/api/${v}/check-tian-secret`, controller.api.blog.checkTianSecret);

  // User
  router.get(`/api/${v}/user-info`, logged(), controller.api.user.info);
  router.get(`/api/${v}/user`, logged(), controller.api.user.list);
  router.get(`/api/${v}/user/:id`, logged(), controller.api.user.detail);
  router.post(`/api/${v}/user`, logged(), controller.api.user.create);
  router.put(`/api/${v}/user/:id`, logged(), controller.api.user.update);
  router.delete(`/api/${v}/user/:id`, logged(), controller.api.user.delete);
  router.put(`/api/${v}/user/:id/level`, logged(), controller.api.user.setLevel);
  router.put(`/api/${v}/user/:id/status`, logged(), controller.api.user.setStatus);

  // Blog
  router.get(`/api/${v}/blog`, logged(), controller.api.blog.list);
  router.get(`/api/${v}/blog/:id`, controller.api.blog.detail); // 文章详情无需权限拦截
  router.post(`/api/${v}/blog`, logged(), controller.api.blog.create);
  router.put(`/api/${v}/blog/:id`, logged(), controller.api.blog.update);
  router.delete(`/api/${v}/blog/:id`, logged(), controller.api.blog.delete);
  router.put(`/api/${v}/blog/:id/like`, controller.api.blog.like);
  router.put(`/api/${v}/blog/:id/dislike`, controller.api.blog.dislike);

  // Tag
  router.get(`/api/${v}/tag`, logged(), controller.api.tag.list);
  router.get(`/api/${v}/tag/:id`, logged(), controller.api.tag.detail);
  router.post(`/api/${v}/tag`, logged(), controller.api.tag.create);
  router.put(`/api/${v}/tag/:id`, logged(), controller.api.tag.update);
  router.delete(`/api/${v}/tag/:id`, logged(), controller.api.tag.delete);

  // Category
  router.get(`/api/${v}/category`, logged(), controller.api.category.list);
  router.get(`/api/${v}/category/:id`, logged(), controller.api.category.detail);
  router.post(`/api/${v}/category`, logged(), controller.api.category.create);
  router.put(`/api/${v}/category/:id`, logged(), controller.api.category.update);
  router.delete(`/api/${v}/category/:id`, logged(), controller.api.category.delete);
};
