const Service = require("egg").Service;

class TagService extends Service {
  async findAll(condition) {
    const { ctx } = this;
    return ctx.model.Tag.findAll(condition);
  }

  async findOne(condition) {
    const { ctx } = this;
    return ctx.model.Tag.findOne(condition);
  }

  async create(row, condition) {
    const { ctx } = this;
    return ctx.model.Tag.create(row, condition);
  }

  async update(row, condition) {
    const { ctx } = this;
    return ctx.model.Tag.update(row, condition);
  }

  async bulkCreate(row, condition) {
    const { ctx } = this;
    return ctx.model.Tag.bulkCreate(row, condition);
  }

  async destroy(condition) {
    const { ctx } = this;
    return ctx.model.Tag.destroy(condition);
  }
}

module.exports = TagService;
