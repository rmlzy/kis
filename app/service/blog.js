const Service = require("egg").Service;

class BlogService extends Service {
  async findAll(condition) {
    const { ctx } = this;
    return ctx.model.Blog.findAll({
      ...condition,
      include: [
        { model: ctx.model.Category, attributes: ["id", "name", "pathname"] },
        { model: ctx.model.Tag, attributes: ["id", "name"] },
        { model: ctx.model.User, attributes: ["id", "avatar", "nickname"] },
      ],
    });
  }

  async findOne(condition) {
    const { ctx } = this;
    return ctx.model.Blog.findOne({
      ...condition,
      include: [
        { model: ctx.model.Category, attributes: ["id", "name", "pathname"] },
        { model: ctx.model.Tag, attributes: ["id", "name"] },
        { model: ctx.model.User, attributes: ["id", "avatar", "nickname"] },
      ],
    });
  }

  async create(row, condition) {
    const { ctx } = this;
    return ctx.model.Blog.create(row, condition);
  }

  async update(row, condition) {
    const { ctx } = this;
    return ctx.model.Blog.update(row, condition);
  }

  async bulkCreate(row, condition) {
    const { ctx } = this;
    return ctx.model.Blog.bulkCreate(row, condition);
  }

  async destroy(condition) {
    const { ctx } = this;
    return ctx.model.Blog.destroy(condition);
  }
}

module.exports = BlogService;
