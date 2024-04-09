const { NODE_ENVS } = require("../constants");

const mongoDbConfig = {
  [NODE_ENVS.DEV]: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDEV",
  },
  [NODE_ENVS.PROD]: {
    host: process.env.PROD_DB_HOST || "localhost",
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || "shopPROD",
  },
};

module.exports = mongoDbConfig;
