import { createEntityActionSelectors, matches } from "../selectors";
import { makeSchema } from "../schema";

describe("partial match", () => {
  const blogPostState = [
    {
      id: 1,
      author: {
        id: 2
      },
      comments: [1, 2]
    },
    {
      id: 2,
      author: {
        id: 2
      }
    }
  ];
  it("matches all blog posts by author", () => {
    const partialMatch = matches([
      {
        author: {
          id: 2
        }
      }
    ]);
    expect(partialMatch(blogPostState)).toBe(true);
  });
  it("matches all blog posts by author and comment", () => {
    const partialMatch = matches([
      {
        author: {
          id: 2
        },
        comments: [1]
      }
    ]);
    expect(partialMatch(blogPostState)).toBe(true);
  });
  it("fails to match blog posts by author and comment", () => {
    const partialMatch = matches([
      {
        author: {
          id: 2
        },
        comments: [3]
      }
    ]);
    expect(partialMatch(blogPostState)).toBe(false);
  });
});
it("creates entity selectors", () => {
  const schema = makeSchema("blogPost");
  const selectors = createEntityActionSelectors(schema);
  expect(selectors.findAll).toBeDefined();
});
