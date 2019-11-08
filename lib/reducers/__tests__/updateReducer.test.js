import reducer from "../updateReducer";
import { updateNormalizedEntity } from "redux-entity/lib/actions";

it("returns initial state with incomplete action", () => {
  const initialState = {};
  expect(reducer(initialState, {})).toBe(initialState);
});

it("returns initial state with incomplete meta", () => {
  const initialState = {};
  expect(reducer(initialState, { meta: {} })).toBe(initialState);
});

it("returns initial state with incomplete entity name", () => {
  const initialState = {};
  expect(reducer(initialState, { meta: { entity: undefined } })).toBe(
    initialState
  );
});

it("returns initial state if entity not exist", () => {
  const initialState = {
    entities: {
      blogPost: {}
    }
  };
  expect(
    reducer(
      initialState,
        updateNormalizedEntity("blogPost", {
        1: {
          id: 1,
          author: 1
        }
      })
    )
  ).toEqual(initialState);
});

it("updates entity", () => {
  const initialState = {
    entities: {
      blogPost: {
        1: {
          id: 1
        }
      }
    }
  };
  expect(
    reducer(
      initialState,
        updateNormalizedEntity("blogPost", {
        1: {
          id: 1,
          author: 2,
          comments: [1]
        }
      })
    )
  ).toEqual({
    entities: {
      blogPost: {
        1: {
          id: 1,
          author: 2,
          comments: [1]
        }
      }
    }
  });
});
