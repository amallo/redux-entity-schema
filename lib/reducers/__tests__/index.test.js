import { createEntityByIdReducer, composeReducer } from "..";
import { mergeEntityById, updateEntityById } from "../../actions";

it("merges entity", () => {
  const reducer = createEntityByIdReducer();
  expect(
    reducer(
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

it("updates entity", () => {
  const reducer = createEntityByIdReducer();
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
      updateEntityById("blogPost", {
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
