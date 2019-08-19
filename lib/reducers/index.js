import { Types } from "../actions";
import { mergeByIdReducer } from "./mergeByIdReducer";

const Handlers = {
  [Types.MERGE_ENTITY_BY_ID]: mergeByIdReducer
};

const InitialState = {
  entities: {}
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
