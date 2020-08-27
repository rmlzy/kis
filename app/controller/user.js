"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async list() {
    const { ctx, service } = this;
    try {
      const users = await service.user.findAll({
        order: [["updatedAt", "DESC"]],
      });
      ctx.body = { success: true, message: "操作成功", data: users };
    } catch (e) {
      ctx.logger.error("Error while UserController.list, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async detail() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      ctx.body = { success: true, data: existed };
    } catch (e) {
      ctx.logger.error("Error while UserController.detail, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { avatar, nickname, email, password, level, status } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { email } });
      if (existed) {
        ctx.body = { success: false, message: `${email} 已存在` };
        return;
      }
      const created = await service.user.create({
        avatar,
        nickname,
        email,
        password: ctx.helper.encryptPassword(password),
        level,
        status,
      });
      ctx.body = { success: true, message: "操作成功", data: created.id };
    } catch (e) {
      ctx.logger.error("Error while UserController.create, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async update() {
    const { ctx, service, app } = this;
    const { Op } = app.Sequelize;
    const { id } = ctx.params;
    const { avatar, nickname, email, level, status } = ctx.request.body;
    try {
      const idExisted = await service.user.findOne({ where: { id: Number(id) } });
      if (!idExisted) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const emailExisted = await service.user.findOne({
        where: {
          email,
          id: { [Op.ne]: id },
        },
      });
      if (emailExisted) {
        ctx.body = { success: false, message: `${email} 已存在` };
        return;
      }
      const updated = await service.user.update({ avatar, nickname, email, level, status }, { where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while UserController.create, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async delete() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const deleted = await service.user.destroy({ where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async setLevel() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { level } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const updated = await service.user.update({ level }, { where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async setStatus() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { status } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: `${id} 不存在` };
        return;
      }
      const updated = await service.user.update({ status, token: "" }, { where: { id } });
      ctx.body = { success: true, message: "操作成功" };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }
}

module.exports = UserController;
