import { createEntityByIdReducer } from "..";
import { mergeEntityById } from "../../actions";

it("merges entity by id", () => {
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
