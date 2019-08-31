import { isValidAction, findOneById } from "./utils";
import { mergeEntitiesReducer } from "./mergeReducer";
import _ from "lodash";
import { InitialState } from "./state";

/**
 *
 * @param {*} state
 */
function entityExists(state, { payload, meta }) {
  const { entity } = meta;
  const { id } = Object.values(payload)[0];
  return !!findOneById(entity, state, id);
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function updateEntitiesReducer(state, action) {
  return entityExists(state, action)
    ? mergeEntitiesReducer(state, action)
    : state;
}
/**
 *
 */
export default (state = InitialState, action) => {
  return isValidAction(action) ? updateEntitiesReducer(state, action) : state;
};
