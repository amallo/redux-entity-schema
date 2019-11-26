import { isValidAction, mergeEntity } from "./utils";
import { InitialState } from "./state";
/**
 *
 * @param {*} state
 * @param {*} action
 */
// TODO add a merge strategy here ?
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
export default (state = InitialState, action) => {
  return isValidAction(action) ? mergeEntitiesReducer(state, action) : state;
};
