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

const removeUndefinedNullObject = (obj) => {
  const result = {};

  Object.keys(obj).forEach((k) => {
    const current = obj[k];

    if ([null, undefined].includes(current)) return;
    if (Array.isArray(current)) return;

    if (typeof current === "object") {
      result[k] = removeUndefinedNullObject(current);
      return;
    }

    result[k] = current;
  });

  return result;
};

module.exports = {
  pickFields,
  getSelectData,
  unGetSelectData,
  removeUndefinedNullObject,
};
