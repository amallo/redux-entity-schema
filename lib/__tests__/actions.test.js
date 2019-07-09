import { createEntityActions } from "../actions";
import { makeSchema } from "../schema";

it("add a blog post entity", () => {
  const schema = makeSchema("blogPost");
  const { Creators, Types } = createEntityActions(schema);
  expect(Types.ADD_BLOGPOST_ENTITY).toBeDefined();

  expect(
    Creators.addBlogPostEntity({
      id: 1
    })
  ).toEqual({
    type: Types.ADD_BLOGPOST_ENTITY,
    payload: {
      id: 1
    }
  });
});
