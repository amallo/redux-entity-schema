import { isValidAction, findEntities } from "./utils";
import { mergeEntitiesReducer } from "./mergeReducer";
import _ from "lodash";
import { InitialState } from "./state";

/**
 *
 * @param {*} state
 */
function findAllById(state, { payload, meta }) {
  const { entity } = meta;
  const searchPayload = Object.values(payload)[0];
  return findEntities(state, entity, searchPayload);
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function updateEntitiesReducer(state, action) {
  return findAllById(state, action).length > 0
    ? mergeEntitiesReducer(state, action)
    : state;
}
/**
 *
 */
export default (state = InitialState, action) => {
  return isValidAction(action) ? updateEntitiesReducer(state, action) : state;
};
