const Service = require("egg").Service;
const _ = require("lodash");

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

  async count() {
    let res = {
      count: 0,
      totalRead: 0,
      totalLike: 0,
      totalDislike: 0,
      totalWordCount: 0,
    };
    try {
      const rows = await this.findAll();
      res.count = rows.length;
      rows.forEach((item) => {
        res.totalWordCount += item.content.length;
        res.totalRead += item.readCount;
        res.totalLike += item.likeCount;
        res.totalDislike += item.dislikeCount;
      });
    } catch (e) {
      // ignore
    }
    return res;
  }
}

module.exports = BlogService;
