import { mergeEntity, isValidAction } from "../utils";
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
    mergeEntity(initialState, {
      1: {
        id: 1,
        author: 2
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

it("merges array", () => {
  const initialState = {
    1: {
      id: 1,
      comments: [1]
    }
  };
  expect(
    mergeEntity(initialState, {
      1: {
        id: 1,
        comments: [2]
      }
    })
  ).toEqual({
    1: {
      id: 1,
      comments: [1, 2]
    }
  });
});
