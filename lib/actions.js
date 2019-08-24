import R from "ramda";
import { entityActionName } from "./actionHelpers";
import { normalize } from "./schema";
/**
 * Returns an action creator from a schema and a type
 */
const schemaToActionCreator = R.curry((schema, type) => {
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
  // Merge or create an entity
  MERGE_ENTITY: "MERGE_ENTITY",
  MERGE_ENTITY_BY_ID: "MERGE_ENTITY_BY_ID",

  // Update an existing entity
  UPDATE_ENTITY: "UPDATE_ENTITY",
  UPDATE_ENTITY_BY_ID: "UPDATE_ENTITY_BY_ID"
};
export const mergeEntityById = (entity, payload) => {
  return {
    type: Types.MERGE_ENTITY_BY_ID,
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
  actionTypes = [Types.MERGE_ENTITY, Types.UPDATE_ENTITY]
) {
  const actionCreator = schemaToActionCreator(schema);
  return actionTypes.map(actionCreator).reduce(R.merge);
}

function mergeChildrenEntities(entities) {
  return R.keys(entities).map(entityName =>
    mergeEntityById(entityName, entities[entityName])
  );
}

/**
 * Generates normalized actions from a given action
 * @param {*} mainAction MERGE_ENTITY, UPDATE_ENTITY action
 */
export function planActions(mainAction) {
  const { meta, payload, type } = mainAction;
  const { schema } = meta;
  const { key } = schema;
  const { entities } = normalize(payload, schema);
  const childrenEntities = R.omit([key], entities);
  switch (type) {
    case Types.MERGE_ENTITY:
      return [
        mergeEntityById(key, entities[key]),
        ...mergeChildrenEntities(childrenEntities)
      ];
    case Types.UPDATE_ENTITY:
      return [
        updateEntityById(key, entities[key]),
        ...mergeChildrenEntities(childrenEntities)
      ];
  }
}
