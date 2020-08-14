"use strict";

const Controller = require("egg").Controller;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
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

  /**
   * 阿里云OSS上传
   */
  async upload() {
    const { ctx } = this;
    const { getFileExt } = ctx.helper;
    const { files } = ctx.request;
    ctx.logger.error("DEBUG: ", file.filepath);
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
    const name = `${uuid}__${file.filename}`;
    try {
      const res = await ctx.oss.put(`pdf_report/${name}`, file.filepath);
      ctx.body = {
        success: true,
        message: ctx.__("SuccessSmg"),
        data: { uuid, name: file.filename, ext, url: res.url },
      };
    } catch (e) {
      ctx.logger.error("ERROR while common/uploadOss : ", e);
      ctx.body = { success: false, message: "文件上传失败, 请重试" };
      ctx.runInBackground(async () => {
        await ctx.service.common.notifyAuthor(e);
      });
    } finally {
      await fs.unlink(file.filepath);
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
      ctx.body = { success: true, message: ctx.__("SuccessSmg") };
    } catch (e) {
      ctx.logger.error("Error while CommonController.login, stack: ", e);
      ctx.body = { success: false, message: ctx.__("InnerErrorMsg") };
    }
  }
}

module.exports = CommonController;
