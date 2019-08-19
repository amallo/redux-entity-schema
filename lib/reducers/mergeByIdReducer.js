import _ from "lodash";
const isValidAction = action => action && action.meta && action.meta.entity;

const initialState = {
  entities: {}
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
function mergeAllReducer(state, action) {
  const { entity } = action.meta;
  return {
    ...state,
    entities: {
      [entity]: {
        ...state.entities[entity],
        ...mergeOneReducer(state.entities[entity], action)
      }
    }
  };
}
export function mergeOneReducer(entityState, { payload }) {
  // Beware that lodash.merge() mutates first parameter
  // so need to clone entityState first.
  const destinationState = _.merge(undefined, entityState);
  return _.merge(destinationState, payload);
}
export const mergeByIdReducer = (state = initialState, action) => {
  return isValidAction(action) ? mergeAllReducer(state, action) : state;
};
