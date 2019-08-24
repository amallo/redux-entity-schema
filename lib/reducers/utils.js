import _ from "lodash";
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

export const isValidAction = action =>
  !!action && !!action.meta && !!action.meta.entity;
