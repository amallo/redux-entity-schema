import { makeSchema } from "../schema";
import {} from "../actions";

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
