import { createEntityByIdReducer } from "..";
import { addEntityById } from "../../actions";

it("adds entity by id", () => {
  const reducer = createEntityByIdReducer();
  expect(
    reducer(
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
