import deleteReducer from "../deleteReducer";

it("returns initial state with incomplete action", () => {
  const initialState = {};
  expect(deleteReducer(initialState, {})).toBe(initialState);
});

it("returns initial state with incomplete meta", () => {
  const initialState = {};
  expect(deleteReducer(initialState, { meta: {} })).toBe(initialState);
});

it("returns initial state with incomplete entity name", () => {
  const initialState = {};
  expect(deleteReducer(initialState, { meta: { entity: undefined } })).toBe(
    initialState
  );
});

it("deletes existing entity by id", () => {
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
    deleteReducer(initialState, {
      type: "DELETE_ACTION_TYPE",
      payload: {
        1: {
          id: "1"
        }
      },
      meta: {
        entity: "blogPost"
      }
    })
  ).toEqual({
    entities: {
      blogPost: {}
    }
  });
});

it("returns initial state if entity not found", () => {
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
    deleteReducer(initialState, {
      type: "DELETE_ACTION_TYPE",
      payload: {
        1000: {
          id: 1000
        }
      },
      meta: {
        entity: "blogPost"
      }
    })
  ).toEqual(initialState);
});
