const _ = require("lodash");

const pickFields = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

/**
 *
 * @param {String[]} select
 */
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]));
};

/**
 *
 * @param {String[]} select
 */
const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]));
};

module.exports = { pickFields, getSelectData, unGetSelectData };
