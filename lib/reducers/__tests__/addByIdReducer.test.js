import { addByIdReducer } from "../addByIdReducer";
import { addEntityById } from "../../actions";

it("returns initial state with incomplete action", () => {
  const initialState = {};
  expect(addByIdReducer(initialState, {})).toBe(initialState);
});

it("returns initial state with incomplete meta", () => {
  const initialState = {};
  expect(addByIdReducer(initialState, { meta: {} })).toBe(initialState);
});

it("returns initial state with incomplete entity name", () => {
  const initialState = {};
  expect(addByIdReducer(initialState, { meta: { entity: undefined } })).toBe(
    initialState
  );
});

it("adds entity by id", () => {
  expect(
    addByIdReducer(
      undefined,
      addEntityById("blogPost", {
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
/*
it("Does not merge with existing properties", () => {
  const initialState = {
    entities: {
      blogPost: {
        1: {
          id: 1,
          author: 1
        }
      }
    }
  };
  expect(
    addByIdReducer(
      initialState,
      addEntityById("blogPost", {
        1: {
          id: 1,
          author: 2
        }
      })
    )
  ).toEqual(initialState);
});
*/
