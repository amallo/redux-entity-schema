import _ from "lodash";
const OperationTypes = {
  ADD: "ADD"
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function entityActionType(operationType, schema) {
  return `${operationType.toUpperCase()}_${schema.key.toUpperCase()}_ENTITY`;
}

function makeEntityActionName(operationType, schema) {
  return `${_.camelCase(operationType)}${capitalizeFirstLetter(
    schema.key
  )}Entity`;
}

function makeEntityActionCreator(operationType, schema) {
  return {
    [makeEntityActionName(operationType, schema)]: payload => {
      return {
        type: entityActionType(operationType, schema),
        payload,
        meta: {
          schema
        }
      };
    }
  };
}

function makeEntityActionType(operationType, schema) {
  const type = `${operationType.toUpperCase()}_${schema.key.toUpperCase()}_ENTITY`;
  return {
    [type]: type
  };
}

export const ActionTypes = {
  ADD_ENTITY_BY_ID: "ADD_ENTITY_BY_ID"
};

export function createEntityActions(schema) {
  return {
    Creators: {
      ...makeEntityActionCreator(OperationTypes.ADD, schema)
    },
    Types: {
      ...makeEntityActionType(OperationTypes.ADD, schema)
    }
  };
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
