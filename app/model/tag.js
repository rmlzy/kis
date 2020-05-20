"use strict";

const dayjs = require("dayjs");

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Tag = app.model.define("Tag", {
    id: {
      type: INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    // 标签名称
    name: {
      type: STRING(100),
      defaultValue: "",
      unique: true,
    },

    // 路径名称
    pathname: {
      type: STRING(100),
      defaultValue: "",
      unique: true,
    },

    // 标签描述
    description: {
      type: STRING(255),
      defaultValue: "",
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
  Tag.associate = function () {
    app.model.Tag.belongsToMany(app.model.Blog, { through: "Blog_Tags" });
  };
  return Tag;
};
