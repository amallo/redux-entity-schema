import { Types } from "../actions";
import mergeReducer from "./mergeReducer";
import { InitialState } from "./state";
const Handlers = {
  [Types.MERGE_ENTITY_BY_ID]: mergeReducer
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
