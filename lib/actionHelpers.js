import _ from "lodash";

export function entityActionType(operationType) {
  return `${operationType.toUpperCase()}_ENTITY`;
}

export function entityActionName(entityActionType) {
  return _.camelCase(entityActionType);
}
