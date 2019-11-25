import { Types } from "redux-entity/lib/actions";
import mergeNormalizedReducer from "redux-entity/lib/reducers/mergeReducer";
import updateNormalizedReducer from "redux-entity/lib/reducers/updateReducer";
import { InitialState } from "./state";
const NormalizedHandlers = {
  [Types.MERGE_NORMALIZED_ENTITY]: mergeNormalizedReducer,
  [Types.UPDATE_NORMALIZED_ENTITY]: updateNormalizedReducer
};

export function createNormalizedReducer(
  initialState = InitialState,
  handlers = NormalizedHandlers
) {
  return (state = initialState, action) => {
    const reducer = handlers[action.type];
    return reducer ? reducer(state, action) : state;
  };
}
