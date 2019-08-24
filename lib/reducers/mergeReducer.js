import { isValidAction, mergeEntity } from "./utils";

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
        ...mergeEntity(state.entities[entity], action.payload)
      }
    }
  };
}
export default (state = initialState, action) => {
  return isValidAction(action) ? mergeEntitiesReducer(state, action) : state;
};
