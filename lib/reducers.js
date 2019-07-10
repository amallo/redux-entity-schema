import { ActionTypes } from "./actions";
function addByIdReducer(state, action) {
  return action && action.meta && action.meta.schema && action.meta.schema.key
    ? {
        ...state,
        entities: {
          [action.meta.schema.key]: {
            byId: {
              ...action.payload
            }
          }
        }
      }
    : state;
}

const Handlers = {
  [ActionTypes.ADD_BY_ID_ENTITY]: addByIdReducer
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
