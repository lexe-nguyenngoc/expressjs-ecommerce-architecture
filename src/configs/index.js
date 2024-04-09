const { NODE_ENVS } = require("../constants");
const appConfig = require("./app.config");
const mongoDbConfig = require("./mongodb.config");

const NODE_ENV =
  (Object.values(NODE_ENVS).includes(process.env.NODE_ENV) &&
    process.env.NODE_ENV) ||
  "dev";

module.exports = {
  app: appConfig[NODE_ENV],
  db: mongoDbConfig[NODE_ENV],
  NODE_ENV,
};
