import { normalize, denormalize } from "./schema";
import _ from "lodash";
import R from "ramda";

/**
 * Select entity part of normalized entity state.
 *
 * const normalizedState = {
 *   entities: {
 *      blogPost: {
 *        1 : {
 *          id: 1
 *        },
 *        ....
 *      }
 *   }
 * }
 *
 * @param {*} state A given normalized entity state
 * @param {*} schema The schema definition part of the normalized entity state
 * @returns normalized entity state, eg. the part under 'blogPost'.
 * {
 *    1: {
 *       id: 1
 *    },
 *    ....
 * }
 */
const selectEntityState = (schema, state) => state.entities[schema.key];

/**
 *
 */
const selectAllEntityById = R.compose(
  Object.values,
  selectEntityState
);

/**
 *
 */
const flattenEntityState = R.compose(
  R.head,
  Object.values,
  selectEntityState
);

/**
 *
 */
const normalizeWithoutResult = R.compose(
  R.omit("result"),
  R.flip(normalize)
);

/**
 *
 * @param {*} schema
 * @param {*} params
 */
export function normalizeParams(schema, params) {
  const normalized = normalizeWithoutResult(schema, params);
  return flattenEntityState(schema, normalized);
}

/**
 *
 */
const createMatcher = R.compose(
  _.matches,
  normalizeParams
);

/**
 *
 * @param {*} schema
 * @param {*} state
 * @param {*} params
 */
const findAll = (schema, state, params) => {
  const matchesSearch = createMatcher(schema, params);
  const findAllSearch = R.filter(matchesSearch);
  const allEntitiesById = selectAllEntityById(schema, state);
  return findAllSearch(allEntitiesById);
};
const findOne = (schema, state, params) => {
  const matchesSearch = createMatcher(schema, params);
  const findOneSearch = R.find(matchesSearch);
  const allEntitiesById = selectAllEntityById(schema, state);
  return findOneSearch(allEntitiesById);
};

export const createFindAllSelector = R.curry((schema, state, params) => {
  const result = findAll(schema, state, params);
  return denormalize(result, [schema], state.entities);
});

export const createFindOneSelector = R.curry((schema, state, params) => {
  const result = findOne(schema, state, params);
  return denormalize(result, schema, state.entities);
});

export const createSelectors = (
  schema,
  selectorCreators = {
    findAll: createFindAllSelector,
    findOne: createFindOneSelector
  }
) => {
  return Object.keys(selectorCreators)
    .map(selectorCreatorName => {
      return {
        [selectorCreatorName]: selectorCreators[selectorCreatorName](schema)
      };
    })
    .reduce(R.merge);
};
