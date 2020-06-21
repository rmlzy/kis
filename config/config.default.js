"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const config = (exports = {});

  // Egg Key
  config.keys = "POPPYTHON";

  // 你的域名
  config.domain = "http://127.0.0.1:1025";

  // 静态文件版本
  config.version = "2020-05-25";

  // TDK
  config.rmlzy = "远子";
  config.poppy = "Poppy";
  config.subtitle =
    "<p><a href='/blog/about-rmlzy.html'>远子</a>: 一只程序猿</p>" +
    "<p><a href='/blog/about-poppy.html'>Poppy</a>: 一只产品汪</p>" +
    "<p>我们有一个可爱的宝宝~</p>";
  config.description = "远子和 Poppy 的小站, 记录一下关于开发、设计的文章";
  config.keywords = "poppy, rmlzy, 远子, 产品设计, 前端开发, 技术博客";
  config.author = {
    name: "Jason Liu",
    email: "rmlzy@outlook.com",
    github: "https://github.com/rmlzy",
    twitter: "https://twitter.com/rmlzy",
  };
  config.copyright = "© 2020, poppython.com";

  // 第一次部署的时间
  config.firstDeployDate = "2020-02-18 17:42:45";

  // 中间件
  config.middleware = ["locals"];

  // 路由无法匹配
  config.notfound = {
    pageUrl: "/404.html",
  };

  // 模板引擎配置
  // https://mozilla.github.io/nunjucks/
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".html": "nunjucks",
    },
  };

  // 程序运行错误
  config.onerror = {
    errorPageUrl: "/500.html",
  };

  // 参数校验
  // https://github.com/eggjs/egg-validate
  exports.validate = {
    // convert: false,
    // validateRoot: false,
  };

  // 安全配置
  config.security = {
    // 关闭 csrf 防范
    csrf: false,
  };

  // 文件上传
  config.multipart = {
    mode: "file",
    fileExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
    fileSize: "5mb",
  };

  // 国际化
  exports.i18n = {
    // 默认语言，默认 "en_US"
    defaultLocale: "zh-CN",
    // URL 参数，默认 "locale"
    queryField: "locale",
    // Cookie 记录的 key, 默认："locale"
    cookieField: "locale",
    // Cookie 的 domain 配置，默认为空，代表当前域名有效
    cookieDomain: "",
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: "1y",
  };

  return config;
};
