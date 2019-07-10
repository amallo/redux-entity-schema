function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function screamingSnakeCaseAddEntityActionType(schema) {
  return `ADD_${schema.key.toUpperCase()}_ENTITY`;
}

function camelCaseAddEntityActionName(schema) {
  return `add${capitalizeFirstLetter(schema.key)}Entity`;
}

function createAddEntityAction(schema) {
  return {
    [camelCaseAddEntityActionName(schema)]: payload => {
      return {
        type: screamingSnakeCaseAddEntityActionType(schema),
        payload
      };
    }
  };
}

function createAddEntityType(schema) {
  const addEntityType = screamingSnakeCaseAddEntityActionType(schema);
  return { [addEntityType]: addEntityType };
}

export const ActionTypes = {
  ADD_ENTITY_BY_ID: "ADD_ENTITY_BY_ID"
};

export function createEntityActions(schema) {
  const Types = {
    ...createAddEntityType(schema)
  };
  const Creators = {
    ...createAddEntityAction(schema)
  };
  return { Creators, Types };
}

export function addEntityById(schema, payload) {
  return {
    type: ActionTypes.ADD_BY_ID_ENTITY,
    payload,
    meta: {
      schema
    }
  };
}
