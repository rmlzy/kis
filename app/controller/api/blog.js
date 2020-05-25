"use strict";

const Controller = require("egg").Controller;

class BlogController extends Controller {
  async detail() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    try {
      const existed = await service.blog.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      ctx.body = { success: true, message: ctx.__("SuccessSmg"), data: existed };
    } catch (e) {
      ctx.logger.error("Error while BlogController.detail, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { title, pathname, summary, tagIds, categoryId, content, status } = ctx.request.body;
    const userId = ctx.helper.getLoggedIdByToken(ctx.cookies.get("tk"));
    try {
      const existed = await service.blog.findOne({ where: { pathname } });
      if (existed) {
        ctx.body = { success: false, message: ctx.__("ExistMsg", pathname) };
        return;
      }
      const created = await service.blog.create({
        title,
        pathname,
        summary,
        userId,
        categoryId,
        content,
        status,
      });
      const tags = await service.tag.findAll({ where: { id: tagIds } });
      await created.setTags(tags);
      ctx.body = { success: true, message: ctx.__("SuccessSmg"), data: created.id };
    } catch (e) {
      ctx.logger.error("Error while BlogController.create, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { title, pathname, summary, tagIds, categoryId, content, status } = ctx.request.body;
    try {
      const existed = await service.blog.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const tags = await service.tag.findAll({ where: { id: tagIds } });
      await existed.update({ title, pathname, summary, categoryId, content, status });
      await existed.setTags(tags);
      ctx.body = { success: true, message: ctx.__("SuccessSmg"), data: id };
    } catch (e) {
      ctx.logger.error("Error while BlogController.create, update: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async delete() {
    const { ctx, service } = this;
    ctx.body = "OK";
  }

  async like() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { decrease } = ctx.request.body;
    try {
      const existed = await service.blog.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const row = {
        likeCount: existed.likeCount + 1,
        dislikeCount: decrease === "true" ? existed.dislikeCount - 1 : existed.dislikeCount,
      };
      const updated = await service.blog.update(row, { where: { id } });
      ctx.body = {
        success: true,
        message: ctx.__("SuccessSmg"),
        data: row,
      };
    } catch (e) {
      ctx.logger.error("Error while BlogController.like, update: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async dislike() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { decrease } = ctx.request.body;
    try {
      const existed = await service.blog.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const row = {
        likeCount: decrease === "true" ? existed.likeCount - 1 : existed.likeCount,
        dislikeCount: existed.dislikeCount + 1,
      };
      const updated = await service.blog.update(row, { where: { id } });
      ctx.body = {
        success: true,
        message: ctx.__("SuccessSmg"),
        data: row,
      };
    } catch (e) {
      ctx.logger.error("Error while BlogController.like, update: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }
}

module.exports = BlogController;
