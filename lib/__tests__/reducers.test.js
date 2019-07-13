import { makeSchema } from "../schema";
import { createEntityByIdReducer } from "../reducers";
import { addEntityById } from "../actions";

it("returns initial state with incomplete action", () => {
  const initialState = {};
  const reducer = createEntityByIdReducer(initialState);
  expect(reducer(initialState, {})).toBe(initialState);
});

it("returns initial state with incomplete meta", () => {
  const initialState = {};
  const reducer = createEntityByIdReducer(initialState);
  expect(reducer(initialState, { meta: {} })).toBe(initialState);
});

it("returns initial state with incomplete schema", () => {
  const initialState = {};
  const reducer = createEntityByIdReducer(initialState);
  expect(reducer(initialState, { meta: { schema: {} } })).toBe(initialState);
});

it("adds entity by id", () => {
  const schema = makeSchema("blogPost");
  const reducer = createEntityByIdReducer();
  expect(
    reducer(
      undefined,
      addEntityById(schema, {
        1: {
          id: 1,
          author: 1
        }
      })
    )
  ).toEqual({
    entities: {
      blogPost: {
        1: {
          id: 1,
          author: 1
        }
      }
    }
  });
});
