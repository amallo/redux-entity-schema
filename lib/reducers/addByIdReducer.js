const isValidAction = action => action && action.meta && action.meta.entity;

function findEntityById(state, action) {
  const { payload } = action;
  const { entity } = action.meta;
  return payload.id ? state.entities[entity][payload.id] : null;
}

function mergeEntity(state, action) {
  const { payload } = action;
  const { entity } = action.meta;
  return {
    ...state,
    entities: {
      [entity]: {
        ...payload
      }
    }
  };
}
function addById(state, action) {
  return findEntityById(state, action) ? state : mergeEntity(state, action);
}
export const addByIdReducer = (state, action) => {
  return isValidAction(action) ? mergeEntity(state, action) : state;
};
