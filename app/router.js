"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  require("./router/view")(app);
  require("./router/api")(app);
};
