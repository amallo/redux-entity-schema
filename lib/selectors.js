import { normalize, denormalize } from "./schema";
import { findOne, findAll } from "./reducers/utils";
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
export const selectEntityState = (schemaName, state) => state.entities[schemaName];

/**
 *
 */
export const selectEntitiesState = R.compose(
  Object.values,
  selectEntityState
);

/**
 *
 */
const selectHeadOfEntitiesState = R.compose(
  R.head,
  selectEntitiesState
);


/**
 * Normalize given params according to a schema
 *
 * @example
 * // returns
 * {
 *   entities: {
 *     blogPost: {
 *       comments: [1]
 *     }
 *   }
 * }
 * const comments = makeSchema('comment')
 * const blogPost = makeSchema('blogPost', {comments })
 * normalizeParams(blogPost, {
 *    comments: [{id: 1}]
 * })
 *
 * @param {Schema} schema A given schema
 * @param {*} denormalizedParams A given denormalized params, eg: API result output
 */
export function normalizeParams(schema, denormalizedParams) {
  const {result, ...normalizedParams} = normalize(denormalizedParams, schema );
  return selectHeadOfEntitiesState(schema.key, normalizedParams)
}

/**
 *
 */
const createNormalizedMatcher = R.compose(
  _.matches,
  normalizeParams
);

export const createFindAllSelector = R.curry((schema, state, params) => {
  const matches = createNormalizedMatcher(schema, params);
  const result = findAll(schema.key, state, matches);
  return denormalize(result, [schema], state.entities);
});

export const createFindOneSelector = R.curry((schema, state, params) => {
  const matches = createNormalizedMatcher(schema, params);
  const result = findOne(schema.key, state, matches);
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
