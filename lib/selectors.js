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
const entityState = (schema, state) => state.entities[schema.key];

/**
 *
 */
export const entityValues = R.compose(
  Object.values,
  entityState
);

/**
 *
 */
const headOfEntityValues = R.compose(
  R.head,
  entityValues
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
  return headOfEntityValues(schema, normalized);
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
  const allEntities = entityValues(schema, state);
  return findAllSearch(allEntities);
};
const findOne = (schema, state, params) => {
  const matchesSearch = createMatcher(schema, params);
  const findOneSearch = R.find(matchesSearch);
  const allEntities = entityValues(schema, state);
  return findOneSearch(allEntities);
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
