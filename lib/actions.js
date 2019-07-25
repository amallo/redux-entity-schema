import R from "ramda";
import { entityActionType, entityActionName } from "./helper";
const OperationTypes = {
  ADD: "ADD"
};

function operationTypeToActionCreator(schema, operationType) {
  const type = entityActionType(operationType);
  return {
    [entityActionName(type)]: payload => {
      return {
        type,
        payload,
        meta: {
          schema
        }
      };
    }
  };
}
function createEntityActionCreators(schema, operationTypes) {
  const curryOperationTypeToActionCreator = R.curry(
    operationTypeToActionCreator
  );
  return operationTypes
    .map(curryOperationTypeToActionCreator(schema))
    .reduce(R.merge);
}
function operationTypeToActionType(operationType) {
  const type = entityActionType(operationType);
  return {
    [type]: type
  };
}
function createEntityActionTypes(operationTypes) {
  return operationTypes.map(operationTypeToActionType).reduce(R.merge);
}

export const ActionTypes = {
  ADD_ENTITY_BY_ID: "ADD_ENTITY_BY_ID"
};

export function createEntityActions(
  schema,
  operationTypes = [OperationTypes.ADD]
) {
  return {
    Creators: {
      ...createEntityActionCreators(schema, operationTypes)
    },
    Types: {
      ...createEntityActionTypes(operationTypes)
    }
  };
}

export function addEntityById(schema, payload) {
  return {
    type: ActionTypes.ADD_ENTITY_BY_ID,
    payload,
    meta: {
      schema
    }
  };
}
