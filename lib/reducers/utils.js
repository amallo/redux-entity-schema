import _ from "lodash";

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
  const entities = entityValues({ key: entity }, state);
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
