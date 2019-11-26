import _ from "lodash";
import R from "ramda";
import { selectEntitiesState, selectEntityState } from "../selectors";

/**
 *
 * @param {*} objValue
 * @param {*} srcValue
 */
function concatArray(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
/**
 * Merges entitySource into entityDestination
 * @example
 *  const source = {a: 1, b: [1]}
 *  const destination = {a: 1, b: [2]}
 *  mergeEntity(destination, source)
 *  //{ a: 1, b: [1,2]}
 * @param {*} entityDestination
 * @param {*} entitySource
 */
export const mergeEntity = R.curry((entityDestination, entitySource) => {
  // Beware that lodash.mergeWith() mutates first parameter
  // so need to clone entityDestination first.
  const destinationState = _.merge({}, entityDestination);
  return _.mergeWith(destinationState, entitySource, concatArray);
});

export const isValidAction = action =>
  !!action && !!action.meta && !!action.meta.entity;

/**
 *
 * @param {String} schemaName a given schema name
 * @param {*} state the root state
 * @param {(Array)->*} searchFn A search function that takes an array as input
 *
 * @returns {*}
 */
const search = (schemaName, state, searchFn) => {
  const allEntities = selectEntitiesState(schemaName, state);
  return searchFn(allEntities);
};

export const findOne = (schemaName, state, matches) => {
  const filter = R.find(matches);
  return search(schemaName, state, filter);
};

export const findOneById = (schemaName, state, id) => {
  const matches = _.matches({ id });
  return findOne(schemaName, state, matches);
};

export const findAll = (schemaName, state, matches) => {
  const filter = R.filter(matches);
  return search(schemaName, state, filter);
};

const isNotSameId = R.curry((leftId, rightId) => {
  return leftId.toString() !== rightId.toString();
});

export const deleteById = (schemaName, state, id) => {
  const initialState = selectEntityState(schemaName, state);
  const entityIds = Object.keys(initialState);
  const entityStateWithoutId = entityIds
    .filter(isNotSameId(id))
    .map(entityId => {
      return {
        [entityId]: { ...initialState[entityId] }
      };
    })
    .reduce(mergeEntity, {});

  const resultState = {
    entities: {
      ...state.entities,
      [schemaName]: {
        ...entityStateWithoutId
      }
    }
  };
  return resultState;
};
