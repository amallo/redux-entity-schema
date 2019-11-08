import { Types } from "redux-entity/lib/actions";
import mergeNormalizedReducer from "redux-entity/lib/reducers/mergeReducer";
import normalizedUpdateReducer from "redux-entity/lib/reducers/updateReducer";
import { InitialState } from "./state";
const Handlers = {
  [Types.MERGE_NORMALIZED_ENTITY]: mergeNormalizedReducer,
  [Types.UPDATE_NORMALIZED_ENTITY]: normalizedUpdateReducer
};

export function createEntityByIdReducer(
  initialState = InitialState,
  handlers = Handlers
) {
  return (state = initialState, action) => {
    const reducer = handlers[action.type];
    return reducer ? reducer(state, action) : state;
  };
}
