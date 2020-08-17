const Subscription = require("egg").Subscription;
const fs = require("fs-extra");

class CleanCached extends Subscription {
  static get schedule() {
    return {
      cron: "0 0 2 * * ?", // 每天凌晨2点执行一次
      type: "all",
      immediate: true,
    };
  }

  async subscribe() {
    const { ctx } = this;
    try {
      await fs.remove("/tmp/egg-multipart-tmp/*");
    } catch (e) {
      ctx.logger.error("清空缓存文件失败: ", e);
    }
  }
}

module.exports = CleanCached;
