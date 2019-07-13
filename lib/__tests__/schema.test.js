import { makeSchema, normalize } from "../schema";
it("creates a simple schema", () => {
  const authorSchema = makeSchema("author");
  expect(authorSchema.key).toBe("author");
});

it("creates a one to one relationship schema", () => {
  const authorSchema = makeSchema("author");
  const commentSchema = makeSchema("comment", {
    author: authorSchema
  });
  expect(commentSchema.schema.author).toBe(authorSchema);
});

it("normalizes a simple schema", () => {
  const authorSchema = makeSchema("author");
  const payload = { id: 1, meta: { schema: { key: "test" } } };

  expect(normalize(payload, authorSchema)).toEqual({
    entities: {
      author: {
        1: {
          id: 1
        }
      }
    }
  });
});

it("normalizes a simple relationship", () => {
  const postSchema = makeSchema("post");
  const authorSchema = makeSchema("author", {
    posts: [postSchema]
  });

  const payload = {
    id: 1,
    posts: [{ id: 2 }]
  };

  expect(normalize(payload, authorSchema)).toEqual({
    entities: {
      author: {
        1: {
          id: 1,
          posts: [2]
        }
      },
      post: {
        2: {
          id: 2
        }
      }
    }
  });
});
