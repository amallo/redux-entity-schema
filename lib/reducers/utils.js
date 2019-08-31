import _ from "lodash";
import R from "ramda";
import { entityValues } from "../selectors";

/**
 *
 * @param {*} objValue
 * @param {*} srcValue
 */
function concatArray(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
/**
 * Merges entitySource into entityDestination
 * @example
 *  const source = {a: 1, b: [1]}
 *  const destination = {a: 1, b: [2]}
 *  mergeEntity(destination, source)
 *  //{ a: 1, b: [1,2]}
 * @param {*} entityDestination
 * @param {*} entitySource
 */
export function mergeEntity(entityDestination, entitySource) {
  // Beware that lodash.mergeWith() mutates first parameter
  // so need to clone entityDestination first.
  const destinationState = _.merge({}, entityDestination);
  return _.mergeWith(destinationState, entitySource, concatArray);
}

export function findEntities(state, entity, payload) {
  const entities = entityValues(entity, state);
  const searchPayload = Object.values(payload)[0];
  return _.filter(
    entities,
    _.matches({
      ...searchPayload
    })
  );
}

export const isValidAction = action =>
  !!action && !!action.meta && !!action.meta.entity;

/**
 *
 * @param {String} schemaName a given schema name
 * @param {*} state the root state
 * @param {(Array)->Array} searchFn A search function that takes an array as input
 *
 * @returns {*}
 */
const search = (schemaName, state, searchFn) => {
  const allEntities = entityValues(schemaName, state);
  return searchFn(allEntities);
};

export const findOne = (schemaName, state, matches) => {
  const filter = R.find(matches);
  return search(schemaName, state, filter);
};

export const findOneById = (schemaName, state, id) => {
  const matches = _.matches({ id });
  return findOne(schemaName, state, matches);
};

export const findAll = (schemaName, state, matches) => {
  const filter = R.filter(matches);
  return search(schemaName, state, filter);
};
