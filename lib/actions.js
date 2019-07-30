import R from "ramda";
import { entityActionName } from "./helper";
import { normalize } from "./schema";
/**
 * Returns an action creator from a schema and a type
 */
const createActionCreator = R.curry((schema, type) => {
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
});
export const Types = {
  ADD_ENTITY: "ADD_ENTITY",
  ADD_ENTITY_BY_ID: "ADD_ENTITY_BY_ID",

  UPDATE_ENTITY: "UPDATE_ENTITY",
  UPDATE_ENTITY_BY_ID: "UPDATE_ENTITY_BY_ID"
};
export const addEntityById = (entity, payload) => {
  return {
    type: Types.ADD_ENTITY_BY_ID,
    payload,
    meta: {
      entity
    }
  };
};
export const updateEntityById = (entity, payload) => {
  return {
    type: Types.UPDATE_ENTITY_BY_ID,
    payload,
    meta: {
      entity
    }
  };
};
export function createEntityActions(
  schema,
  actionTypes = [Types.ADD_ENTITY, Types.UPDATE_ENTITY]
) {
  const actionTypeToActionCreator = createActionCreator(schema);
  return actionTypes.map(actionTypeToActionCreator).reduce(R.merge);
}

export function planActions(mainAction) {
  const { meta, payload, type } = mainAction;
  const { schema } = meta;
  const { entities } = normalize(payload, schema);
  return R.keys(entities).map(entityName => {
    switch (type) {
      case Types.ADD_ENTITY:
        return addEntityById(entityName, entities[entityName]);
      case Types.UPDATE_ENTITY:
        return updateEntityById(entityName, entities[entityName]);
    }
  });
}
