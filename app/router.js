"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require("./router/front")(app);
  require("./router/admin")(app);
  require("./router/api")(app);
};
