import _ from "lodash";
export function mergeEntityReducer(entityState, { payload }) {
  // Beware that lodash.merge() mutates first parameter
  // so need to clone entityState first.
  const destinationState = _.merge(undefined, entityState);
  return _.merge(destinationState, payload);
}

export const isValidAction = action =>
  !!action && !!action.meta && !!action.meta.entity;
