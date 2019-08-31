import {
  mergeEntity,
  isValidAction,
  findOne,
  findOneById,
  findAll
} from "../utils";
import _ from "lodash";
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

it("finds one entity by a given matcher", () => {
  const state = {
    entities: {
      blogPost: {
        1: {
          id: 1
        },
        2: {
          id: 2
        }
      }
    }
  };
  const matches = _.matches({ id: 1 });
  expect(findOne("blogPost", state, matches)).toEqual({
    id: 1
  });
});

it("finds one entity by an id", () => {
  const state = {
    entities: {
      blogPost: {
        1: {
          id: 1
        },
        2: {
          id: 2
        }
      }
    }
  };
  expect(findOneById("blogPost", state, 1)).toEqual({
    id: 1
  });

  expect(findOneById("blogPost", state, 10)).toBeUndefined();
});

it("finds all entities by a given matcher", () => {
  const state = {
    entities: {
      blogPost: {
        1: {
          id: 1
        },
        2: {
          id: 2
        }
      }
    }
  };
  const matches = _.matches({ id: 1 });
  expect(findAll("blogPost", state, matches)).toEqual([
    {
      id: 1
    }
  ]);
});
