import {
  createFindAllSelector,
  createFindOneSelector,
  normalizeParams,
  createSelectors
} from "../selectors";
import { makeSchema } from "../schema";
import _ from "lodash";

describe("match", () => {
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
    const partialMatch = _.matches([
      {
        author: {
          id: 2
        }
      }
    ]);
    expect(partialMatch(blogPostState)).toBe(true);
  });
  it("matches all blog posts by author and comment", () => {
    const partialMatch = _.matches([
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
    const partialMatch = _.matches([
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

describe("selectors", () => {
  const state = {
    entities: {
      blogPost: {
        1: {
          id: 1,
          author: 1,
          date: "now"
        },
        2: {
          id: 2,
          author: 2,
          date: "tomorrow"
        }
      },
      author: {
        1: {
          id: 1,
          name: "audie"
        },
        2: {
          id: 2,
          name: "jack"
        }
      }
    }
  };

  it("normalizes params for an id", () => {
    const blogPostSchema = makeSchema("blogPost");
    expect(
      normalizeParams(blogPostSchema, {
        id: 1
      })
    ).toEqual({
      id: 1
    });
  });

  it("normalizes params for a custom property", () => {
    const blogPostSchema = makeSchema("blogPost");
    expect(
      normalizeParams(blogPostSchema, {
        date: "now"
      })
    ).toEqual({
      date: "now"
    });
  });

  it("normalizes params for a relationship", () => {
    const authorSchema = makeSchema("author");
    const blogPostSchema = makeSchema("blogPost", {
      author: authorSchema
    });
    expect(
      normalizeParams(blogPostSchema, {
        id: 1,
        author: {
          id: 1
        }
      })
    ).toEqual({
      id: 1,
      author: 1
    });
  });

  it("find all blog post by id", () => {
    const blogPostSchema = makeSchema("blogPost");
    const findAllBlogPost = createFindAllSelector(blogPostSchema);
    expect(
      findAllBlogPost(state, {
        id: 1
      })
    ).toEqual([
      {
        id: 1,
        author: 1,
        date: "now"
      }
    ]);
  });

  it("find one blog post by id", () => {
    const blogPostSchema = makeSchema("blogPost");
    const findOneBlogPost = createFindOneSelector(blogPostSchema);
    expect(
      findOneBlogPost(state, {
        id: 1
      })
    ).toEqual({
      id: 1,
      author: 1,
      date: "now"
    });
  });

  it("find all blog post written tomorrow", () => {
    const blogPostSchema = makeSchema("blogPost");
    const findAllBlogPost = createFindAllSelector(blogPostSchema);
    expect(
      findAllBlogPost(state, {
        date: "tomorrow"
      })
    ).toEqual([
      {
        id: 2,
        author: 2,
        date: "tomorrow"
      }
    ]);
  });

  it("find one blog post written tomorrow", () => {
    const blogPostSchema = makeSchema("blogPost");
    const findOneBlogPost = createFindOneSelector(blogPostSchema);
    expect(
      findOneBlogPost(state, {
        date: "tomorrow"
      })
    ).toEqual({
      id: 2,
      author: 2,
      date: "tomorrow"
    });
  });

  it("find all blog post with their relationship", () => {
    const authorSchema = makeSchema("author");
    const blogPostSchema = makeSchema("blogPost", {
      author: authorSchema
    });

    const findAllBlogPost = createFindAllSelector(blogPostSchema);
    expect(
      findAllBlogPost(state, {
        id: 1
      })
    ).toEqual([
      {
        id: 1,
        author: {
          id: 1,
          name: "audie"
        },
        date: "now"
      }
    ]);
  });

  it("find one blog post with their relationship", () => {
    const authorSchema = makeSchema("author");
    const blogPostSchema = makeSchema("blogPost", {
      author: authorSchema
    });

    const findOneBlogPost = createFindOneSelector(blogPostSchema);
    expect(
      findOneBlogPost(state, {
        id: 1
      })
    ).toEqual({
      id: 1,
      author: {
        id: 1,
        name: "audie"
      },
      date: "now"
    });
  });

  it("find all blog post by a relation ship id", () => {
    const authorSchema = makeSchema("author");
    const blogPostSchema = makeSchema("blogPost", {
      author: authorSchema
    });

    const findAllBlogPost = createFindAllSelector(blogPostSchema);
    expect(
      findAllBlogPost(state, {
        author: {
          id: 1
        }
      })
    ).toEqual([
      {
        id: 1,
        author: {
          id: 1,
          name: "audie"
        },
        date: "now"
      }
    ]);
  });

  it("find one blog post by a relation ship id", () => {
    const authorSchema = makeSchema("author");
    const blogPostSchema = makeSchema("blogPost", {
      author: authorSchema
    });

    const findOneBlogPost = createFindOneSelector(blogPostSchema);
    expect(
      findOneBlogPost(state, {
        author: {
          id: 1
        }
      })
    ).toEqual({
      id: 1,
      author: {
        id: 1,
        name: "audie"
      },
      date: "now"
    });
  });

  it("creates selector with default definition", () => {
    const blogPostSchema = makeSchema("blogPost");
    const selectors = createSelectors(blogPostSchema);
    expect(selectors.findAll).toBeDefined();
    expect(selectors.findOne).toBeDefined();
  });
  it("creates selector with custom definition", () => {
    const blogPostSchema = makeSchema("blogPost");
    const customSelectorCreator = jest.fn();
    createSelectors(blogPostSchema, {
      callSelectorName: customSelectorCreator
    });
    expect(customSelectorCreator).toHaveBeenCalledWith(blogPostSchema);
  });
  it("throws error if selectors empty", () => {
    const blogPostSchema = makeSchema("blogPost");
    expect(() => createSelectors(blogPostSchema, {}).toThrow());
    expect(() => createSelectors(blogPostSchema, null).toThrow());
  });
  it("throws error if selectors function definition mismatch", () => {
    const blogPostSchema = makeSchema("blogPost");
    expect(() =>
      createSelectors(blogPostSchema, {
        thisIsABadDef: () => {}
      }).toThrow()
    );
  });
});
