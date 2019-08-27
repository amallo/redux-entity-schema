import { Types } from "../actions";
import mergeReducer from "./mergeReducer";
import updateReducer from "./updateReducer";
import { InitialState } from "./state";
const Handlers = {
  [Types.MERGE_ENTITY_BY_ID]: mergeReducer,
  [Types.UPDATE_ENTITY_BY_ID]: updateReducer
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
