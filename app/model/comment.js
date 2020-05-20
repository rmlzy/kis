"use strict";

const dayjs = require("dayjs");

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Comment = app.model.define("Comment", {
    id: {
      type: INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    // 文章ID
    blogId: {
      type: INTEGER(10),
      allowNull: false,
    },

    // 评论
    content: {
      type: STRING(1024),
      defaultValue: "",
      allowNull: false,
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
  Comment.associate = function () {
    app.model.Comment.belongsTo(app.model.Blog, { foreignKey: "blogId" });
  };
  return Comment;
};
