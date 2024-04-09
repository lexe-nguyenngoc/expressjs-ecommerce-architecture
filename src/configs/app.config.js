const { NODE_ENVS } = require("../constants");

const appConfig = {
  [NODE_ENVS.DEV]: {
    PORT: process.env.DEV_APP_PORT || 3052,
  },
  [NODE_ENVS.PROD]: {
    PORT: process.env.PROD_APP_PORT || 3000,
  },
};

module.exports = appConfig;
