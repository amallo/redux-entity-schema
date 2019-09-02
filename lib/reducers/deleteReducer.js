import { isValidAction, deleteById } from "./utils";
import { InitialState } from "./state";
/**
 *
 * @param {*} state
 * @param {*} action
 */
function deleteEntitiesReducer(state, action) {
  const { entity } = action.meta;
  const { payload } = action;
  const id = Object.values(payload)[0].id;
  return deleteById(entity, state, id);
}
export default (state = InitialState, action) => {
  return isValidAction(action) ? deleteEntitiesReducer(state, action) : state;
};
