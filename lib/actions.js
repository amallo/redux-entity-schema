export const Types = {
  ADD_ENTITY: "ADD_ENTITY",
  ADD_ONE_TO_ONE_ENTITY: "ADD_ONE_TO_ONE_ENTITY"
};
export function createAction(schema, actionType) {
  return payload => {
    return {
      type: Types[`${actionType}_ENTITY`],
      payload,
      meta: {
        schema
      }
    };
  };
}

export function createOneToOneActions(schema, actionType) {
  return payload => {};
}
