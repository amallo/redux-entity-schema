import R from "ramda";
import { SchemaTypes } from "./schema";

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
  return payload => {
    return R.keys(schema.fields)
      .filter(
        fieldName =>
          schema.fields[fieldName].type === SchemaTypes.ONE_TO_ONE_REFERENCE
      )
      .map(fieldName => {
        return {
          type: Types[`${actionType}_ONE_TO_ONE_ENTITY`],
          payload: {
            kind: "oneToOne",
            source: {
              type: schema.name,
              id: payload.id
            },
            target: {
              type: schema.fields[fieldName].schema,
              id: payload[fieldName]
            }
          }
        };
      });
  };
}
