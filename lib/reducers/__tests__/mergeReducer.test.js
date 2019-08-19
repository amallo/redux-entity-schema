import mergeReducer, { mergeOneReducer } from "../mergeReducer";
import { mergeEntityById } from "../../actions";

it("returns initial state with incomplete action", () => {
  const initialState = {};
  expect(mergeReducer(initialState, {})).toBe(initialState);
});

it("returns initial state with incomplete meta", () => {
  const initialState = {};
  expect(mergeReducer(initialState, { meta: {} })).toBe(initialState);
});

it("returns initial state with incomplete entity name", () => {
  const initialState = {};
  expect(mergeReducer(initialState, { meta: { entity: undefined } })).toBe(
    initialState
  );
});

it("adds entity by id", () => {
  expect(
    mergeReducer(
      undefined,
      mergeEntityById("blogPost", {
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

it("Does merge with existing properties", () => {
  const initialState = {
    entities: {
      blogPost: {
        1: {
          id: 1,
          date: "now",
          comments: [1]
        }
      }
    }
  };
  expect(
    mergeReducer(
      initialState,
      mergeEntityById("blogPost", {
        1: {
          id: 1,
          author: 2
        }
      })
    )
  ).toEqual({
    entities: {
      blogPost: {
        1: {
          id: 1,
          author: 2,
          date: "now",
          comments: [1]
        }
      }
    }
  });
});

it("merges one entity", () => {
  const initialState = {
    1: {
      id: 1,
      comments: [1]
    }
  };
  expect(
    mergeOneReducer(
      initialState,
      mergeEntityById("blogPost", {
        1: {
          id: 1,
          author: 2
        }
      })
    )
  ).toEqual({
    1: {
      id: 1,
      author: 2,
      comments: [1]
    }
  });
});
