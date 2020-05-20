const Service = require("egg").Service;
const ip = require("ip");

class VisitorService extends Service {
  async findAll(condition) {
    const { ctx } = this;
    return ctx.model.Visitor.findAll(condition);
  }

  async create() {
    const { ctx } = this;
    const ua = ctx.headers["user-agent"];
    const userIp = ip.address();
    const url = ctx.request.url;
    const existed = await ctx.model.Visitor.findOne({ ip: userIp });
    if (existed) {
      return;
    }
    return ctx.model.Visitor.create({ ua, ip: userIp, url });
  }
}

module.exports = VisitorService;
