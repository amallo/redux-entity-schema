import R from "ramda";
import { entityActionName } from "redux-entity/lib/actions/helpers";
import { normalize } from "redux-entity/lib/schema";
/**
 * Returns an action creator from a schema and an action type
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
  MERGE_NORMALIZED_ENTITY: "MERGE_NORMALIZED_ENTITY",

  // Update an existing entity
  UPDATE_ENTITY: "UPDATE_ENTITY",
  UPDATE_NORMALIZED_ENTITY: "UPDATE_NORMALIZED_ENTITY"
};
export const mergeNormalizedEntity = (entity, payload) => {
  return {
    type: Types.MERGE_NORMALIZED_ENTITY,
    payload,
    meta: {
      entity
    }
  };
};
export const updateNormalizedEntity = (entity, payload) => {
  return {
    type: Types.UPDATE_NORMALIZED_ENTITY,
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

function createMergeChildrenActions(entities) {
  return Object.keys(entities).map(entityName =>
      mergeNormalizedEntity(entityName, entities[entityName])
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
        mergeNormalizedEntity(key, entities[key]),
        ...createMergeChildrenActions(childrenEntities)
      ];
    case Types.UPDATE_ENTITY:
      return [
        updateNormalizedEntity(key, entities[key]),
        ...createMergeChildrenActions(childrenEntities)
      ];
  }
}
