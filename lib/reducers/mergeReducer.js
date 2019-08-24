import { isValidAction, mergeEntityReducer } from "./utils";

const initialState = {
  entities: {}
};

/**
 *
 * @param {*} state
 * @param {*} action
 */
export function mergeEntitiesReducer(state, action) {
  const { entity } = action.meta;

  return {
    ...state,
    entities: {
      [entity]: {
        ...state.entities[entity],
        ...mergeEntityReducer(state.entities[entity], action)
      }
    }
  };
}
export default (state = initialState, action) => {
  return isValidAction(action) ? mergeEntitiesReducer(state, action) : state;
};
