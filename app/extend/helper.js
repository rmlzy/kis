"use strict";

const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");
const md5 = require("blueimp-md5");
const jwt = require("jsonwebtoken");
const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return "";
  },
});

module.exports = {
  md5(str) {
    return md5(str);
  },

  md2html(markdown) {
    return md.render(markdown);
  },

  calcReadTime(wordCount) {
    let readTime = "";
    const minutes = Math.ceil(wordCount / 1000);
    // for (let i = 0; i < minutes; i++) {
    //   readTime += "☕️";
    // }
    readTime += ` ${minutes} min read`;
    return readTime;
  },

  encryptPassword(password) {
    return md5(md5(password));
  },

  getFileExt(filename) {
    const ext = filename.split(".").pop();
    return ext || "";
  },

  getLoggedIdByToken(token) {
    let id;
    try {
      const jwtSecret = this.config.keys;
      const decoded = jwt.verify(token, jwtSecret);
      id = decoded.id;
    } catch (e) {
      // ignore
    }
    return id;
  },

  generateToken(payload, options) {
    const jwtSecret = this.config.keys;
    return jwt.sign(payload, jwtSecret, options);
  },
};
