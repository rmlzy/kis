"use strict";

const Controller = require("egg").Controller;

class TagController extends Controller {
  async list() {
    const { ctx, service } = this;
    try {
      const blogs = await service.tag.findAll({
        order: [["updatedAt", "DESC"]],
      });
      ctx.body = { success: true, message: ctx.__("SuccessSmg"), data: blogs };
    } catch (e) {
      ctx.logger.error("Error while TagController.list, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async detail() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const existed = await service.tag.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      ctx.body = { success: true, data: existed };
    } catch (e) {
      ctx.logger.error("Error while TagController.detail, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { name, pathname, description } = ctx.request.body;
    try {
      const existed = await service.tag.findOne({ where: { pathname } });
      if (existed) {
        ctx.body = { success: false, message: ctx.__("ExistMsg", pathname) };
        return;
      }
      const created = await service.tag.create({ name, pathname, description });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while TagController.create, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async update() {
    const { ctx, service, app } = this;
    const { Op } = app.Sequelize;
    const { id } = ctx.params;
    const { name, pathname, description } = ctx.request.body;
    try {
      const idExisted = await service.tag.findOne({ where: { id: Number(id) } });
      if (!idExisted) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const pathNameExisted = await service.tag.findOne({
        where: {
          pathname,
          id: { [Op.ne]: id },
        },
      });
      if (pathNameExisted) {
        ctx.body = { success: false, message: ctx.__("ExistMsg", pathname) };
        return;
      }
      const updated = await service.tag.update({ name, pathname, description }, { where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while TagController.create, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async delete() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    try {
      const existed = await service.tag.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const deleted = await service.tag.destroy({ where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while TagController.delete, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }
}

module.exports = TagController;
