import { Types } from "../actions";
import { addByIdReducer } from "./addByIdReducer";

const Handlers = {
  [Types.ADD_ENTITY_BY_ID]: addByIdReducer
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
