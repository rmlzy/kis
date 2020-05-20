"use strict";

const Controller = require("egg").Controller;
const { v4: uuidv4 } = require("uuid");
const svgCaptcha = require("svg-captcha");

class CommonController extends Controller {
  async getFullUrlByBlogTitle() {
    const { ctx, service, config } = this;
    try {
      // TODO: 中文标题获取拼音, 转小写, 空格转-
      const { title } = ctx.request.body;
      const uuid = uuidv4();
      ctx.body = {
        success: true,
        data: {
          pathname: uuid,
          fullLink: `${config.domain}/blog/${uuid}.html`,
        },
      };
    } catch (e) {
      ctx.logger.error("Error while CommonController.getFullUrlByBlogTitle, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  /**
   * 生成图片验证码
   * https://github.com/produck/svg-captcha
   */
  async generateImageCaptcha() {
    const { ctx } = this;
    try {
      const captcha = svgCaptcha.create({
        width: 70,
        height: 30,
        fontSize: 40,
      });
      ctx.session.captcha = captcha.text;
      ctx.body = { success: true, data: captcha.data };
    } catch (e) {
      ctx.logger.error("Error while CommonController.generateImageCaptcha, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }

  async login() {
    const { ctx, service, config } = this;
    const { code, email, password, captcha } = ctx.request.body;
    if (config.keys !== code) {
      ctx.body = { success: false, message: ctx.__("LoginFailed") };
      return;
    }
    if (captcha.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
      ctx.body = { success: false, message: ctx.__("CaptchaError") };
      return;
    }
    try {
      const isRightPwd = await service.user.verifyPassword(email, password);
      if (!isRightPwd) {
        ctx.body = { success: false, message: ctx.__("LoginFailed") };
        return;
      }
      const token = await service.user.generateToken(email, password);
      ctx.cookies.set("tk", token);
      ctx.redirect("/admin/dashboard.html");
    } catch (e) {
      ctx.logger.error("Error while CommonController.login, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }
}

module.exports = CommonController;
