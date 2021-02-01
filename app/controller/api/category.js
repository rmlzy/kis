"use strict";

const Controller = require("egg").Controller;

class CategoryController extends Controller {
  async list() {
    const { ctx, service } = this;
    try {
      const blogs = await service.category.findAll({
        order: [["updatedAt", "DESC"]],
      });
      ctx.body = { success: true, message: "操作成功", data: blogs };
    } catch (e) {
      ctx.logger.error("Error while CategoryController.list, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async detail() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const existed = await service.category.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      ctx.body = { success: true, data: existed };
    } catch (e) {
      ctx.logger.error("Error while CategoryController.detail, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { name, pathname, description } = ctx.request.body;
    try {
      const existed = await service.category.findOne({ where: { pathname } });
      if (existed) {
        ctx.body = { success: false, message: `${pathname} 已存在` };
        return;
      }
      const created = await service.category.create({ name, pathname, description });
      ctx.body = { success: true, message: "操作成功", data: created.id };
    } catch (e) {
      ctx.logger.error("Error while CategoryController.create, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async update() {
    const { ctx, service, app } = this;
    const { Op } = app.Sequelize;
    const { id } = ctx.params;
    const { name, pathname, description } = ctx.request.body;
    try {
      const idExisted = await service.category.findOne({ where: { id: Number(id) } });
      if (!idExisted) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const pathNameExisted = await service.category.findOne({
        where: {
          pathname,
          id: { [Op.ne]: id },
        },
      });
      if (pathNameExisted) {
        ctx.body = { success: false, message: `${pathname} 不存在` };
        return;
      }
      const updated = await service.category.update({ name, pathname, description }, { where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while CategoryController.create, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async delete() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    try {
      const existed = await service.category.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const deleted = await service.category.destroy({ where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while CategoryController.delete, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }
}

module.exports = CategoryController;
