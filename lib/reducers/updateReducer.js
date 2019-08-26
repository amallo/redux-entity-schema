import { isValidAction } from "./utils";
import { mergeEntitiesReducer } from "./mergeReducer";
import { entityValues } from "../selectors";
import _ from "lodash";
import { InitialState } from "./state";

/**
 *
 * @param {*} state
 */
function findAllById(state, { payload, meta }) {
  const { entity } = meta;
  const entities = entityValues({ key: entity }, state);
  const searchPayload = Object.values(payload)[0];
  return _.filter(
    entities,
    _.matches({
      id: searchPayload.id
    })
  );
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
