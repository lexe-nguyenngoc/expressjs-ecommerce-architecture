const _ = require("lodash");

const pickFields = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

module.exports = { pickFields };
