"use strict";

const Controller = require("egg").Controller;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const svgCaptcha = require("svg-captcha");

class CommonController extends Controller {
  /**
   * 生成图片验证码
   * https://github.com/produck/svg-captcha
   */
  async genCaptcha() {
    const { ctx } = this;
    try {
      const captcha = svgCaptcha.create({
        width: 70,
        height: 30,
        fontSize: 40,
      });
      ctx.session.captcha = captcha.text;
      ctx.body = { success: true, data: captcha.data, debug: captcha.text };
    } catch (e) {
      ctx.logger.error("Error while CommonController.generateImageCaptcha, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  /**
   * 阿里云OSS上传
   */
  async upload() {
    const { ctx } = this;
    const { getFileExt } = ctx.helper;
    const { files } = ctx.request;
    if (!files || files.length === 0) {
      ctx.body = { success: false, message: "未检测到附件, 请重试" };
      return;
    }
    if (files.length > 1) {
      ctx.body = { success: false, message: "仅允许单个文件上传, 请重试" };
      return;
    }
    const file = files[0];
    const uuid = uuidv4();
    const ext = getFileExt(file.filename);
    let res;
    try {
      res = await ctx.oss.put(`kis/${uuid}.${ext}`, file.filepath);
    } catch (e) {
      ctx.logger.error("ERROR while common/uploadOss : ", e);
    } finally {
      await fs.unlink(file.filepath);
    }
    if (res) {
      ctx.body = {
        success: true,
        message: "操作成功",
        data: { uuid, name: file.filename, ext, url: res.url },
      };
    } else {
      ctx.body = { success: false, message: "文件上传失败, 请重试" };
    }
  }

  async login() {
    const { ctx, service } = this;
    const { email, password, captcha } = ctx.request.body;
    if (captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
      ctx.body = { success: false, message: "验证码错误" };
      return;
    }
    try {
      const isRightPwd = await service.user.verifyPassword(email, password);
      if (!isRightPwd) {
        ctx.body = { success: false, message: "用户名或密码错误" };
        return;
      }
      const token = await service.user.generateToken(email, password);
      ctx.body = { success: true, message: "操作成功", data: token };
    } catch (e) {
      ctx.logger.error("Error while CommonController.login, stack: ", e);
      ctx.body = { success: false, message: "抱歉, 内部服务器错误" };
    }
  }

  async checkToken() {
    const { ctx } = this;
    const { token } = ctx.request.body;
    const userId = ctx.helper.getLoggedIdByToken(token);
    if (userId) {
      ctx.body = { success: true, message: "Token 校验成功", data: userId };
    } else {
      ctx.body = { success: false, message: "Token 校验失败" };
    }
  }
}

module.exports = CommonController;
