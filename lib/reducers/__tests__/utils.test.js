import { mergeEntityReducer, isValidAction } from "../utils";
it("checks if valid action", () => {
  expect(isValidAction(null)).toBe(false);
  expect(isValidAction({})).toBe(false);
  expect(isValidAction({ meta: {} })).toBe(false);
  expect(isValidAction({ meta: { entity: null } })).toBe(false);
  expect(isValidAction({ meta: { entity: "check" } })).toBe(true);
});
it("merges one entity", () => {
  const initialState = {
    1: {
      id: 1,
      comments: [1]
    }
  };
  expect(
    mergeEntityReducer(initialState, {
      type: "WHAT_YOU_WANT",
      payload: {
        1: {
          id: 1,
          author: 2
        }
      },
      meta: {
        schema: {
          entity: "blogPost"
        }
      }
    })
  ).toEqual({
    1: {
      id: 1,
      author: 2,
      comments: [1]
    }
  });
});
