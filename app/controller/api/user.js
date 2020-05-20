"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async detail() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      ctx.body = { success: true, data: existed };
    } catch (e) {
      ctx.logger.error("Error while UserController.detail, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async create() {
    const { ctx, service } = this;
    const { avatar, nickname, email, password, level, status } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { email } });
      if (existed) {
        ctx.body = { success: false, message: ctx.__("ExistMsg", email) };
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
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while UserController.create, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
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
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const emailExisted = await service.user.findOne({
        where: {
          email,
          id: { [Op.ne]: id },
        },
      });
      if (emailExisted) {
        ctx.body = { success: false, message: ctx.__("ExistMsg", email) };
        return;
      }
      const updated = await service.user.update({ avatar, nickname, email, level, status }, { where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while UserController.create, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async delete() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const deleted = await service.user.destroy({ where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async setLevel() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { level } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const updated = await service.user.update({ level }, { where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async setStatus() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { status } = ctx.request.body;
    try {
      const existed = await service.user.findOne({ where: { id } });
      if (!existed) {
        ctx.body = { success: false, message: ctx.__("NotExistMsg", id) };
        return;
      }
      const updated = await service.user.update({ status, token: "" }, { where: { id } });
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while UserController.delete, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }
}

module.exports = UserController;
