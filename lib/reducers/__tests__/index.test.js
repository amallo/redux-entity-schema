import { createNormalizedReducer } from "..";
import {
  mergeNormalizedEntity,
  updateNormalizedEntity
} from "redux-entity/lib/actions";

it("merges entity", () => {
  const reducer = createNormalizedReducer();
  expect(
    reducer(
      undefined,
      mergeNormalizedEntity("blogPost", {
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

it("updates entity", () => {
  const reducer = createNormalizedReducer();
  expect(
    reducer(
      {
        entities: {
          blogPost: {
            1: {
              id: 1
            }
          }
        }
      },
      updateNormalizedEntity("blogPost", {
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
describe("compose reducer", () => {
  it("runs reducer before", () => {
    const onAfterDeleteReducer = (state, action) => {};
    const entityReducer = createEntityByIdReducer();
    const reducer = composeReducer(entityReducer, onAfterDeleteReducer);
    expect(reducer());
  });
});
*/
