"use strict";

const dayjs = require("dayjs");

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Blog = app.model.define("Blog", {
    id: {
      type: INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    // 用户ID
    userId: {
      type: INTEGER(10),
      default: 0,
    },

    // 类型, Markdown 或 富文本
    type: {
      type: STRING(10),
      values: ["MARKDOWN", "RICH_TEXT"],
      defaultValue: "MARKDOWN",
    },

    // 标题
    title: {
      type: STRING(100),
      defaultValue: "",
    },

    // 分类
    categoryId: {
      type: INTEGER(10),
    },

    // 路径
    pathname: {
      type: STRING(100),
      defaultValue: "",
    },

    // 摘要
    summary: {
      type: STRING(200),
      defaultValue: "",
    },

    // 内容
    content: {
      type: STRING(20000),
      defaultValue: "",
    },

    // 字数统计
    wordCount: {
      type: INTEGER,
      defaultValue: 0,
    },

    // 阅读数
    readCount: {
      type: INTEGER,
      defaultValue: 0,
    },

    // 喜欢数
    likeCount: {
      type: INTEGER,
      defaultValue: 0,
    },

    // 讨厌数
    dislikeCount: {
      type: INTEGER,
      defaultValue: 0,
    },

    // 状态: 草稿、已发布、置顶、已删除
    status: {
      type: STRING(10),
      values: ["DRAFT", "PUBLISHED", "TOP", "HIDE", "DELETED"],
      defaultValue: "DRAFT",
    },

    createdAt: {
      type: DATE,
      get() {
        const createdAt = this.getDataValue("createdAt");
        return dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },

    updatedAt: {
      type: DATE,
      get() {
        const updatedAt = this.getDataValue("updatedAt");
        return dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  });
  Blog.associate = function () {
    app.model.Blog.belongsTo(app.model.Category, { foreignKey: "categoryId" });
    app.model.Blog.belongsTo(app.model.User, { foreignKey: "userId" });
    app.model.Blog.hasMany(app.model.Comment);
    app.model.Blog.belongsToMany(app.model.Tag, { through: "Blog_Tags" });
  };
  return Blog;
};
