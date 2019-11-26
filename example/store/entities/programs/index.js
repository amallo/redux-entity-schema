import { makeSchema, createSelectors, createEntityActions as createActions } from 'redux-entity'

export const schema = makeSchema('program')
export const selectors = createSelectors(schema)
export const actions = createActions(schema)
