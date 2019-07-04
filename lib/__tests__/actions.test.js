import { createAction, createOneToOneActions, Types } from "../actions";

it("add entity", () => {
  const schema = {
    name: "blogPost",
    fields: {
      id: "string"
    }
  };
  const addBlogPostAction = createAction(schema, "ADD");
  expect(
    addBlogPostAction({
      id: "1"
    })
  ).toEqual({
    type: Types.ADD_ENTITY,
    payload: {
      id: "1"
    },
    meta: {
      schema: {
        name: "blogPost",
        fields: {
          id: "string"
        }
      }
    }
  });
});

it("add to one relationship", () => {
  const schema = {
    name: "blogPost",
    fields: {
      id: "string",
      author: {
        type: "reference",
        kind: "oneToOne",
        target: "user1"
      }
    }
  };
  const addOneToOneAction = createOneToOneActions(schema, "ADD");
  const actions = addOneToOneAction(
    {
      id: "blogPost1",
      author: {
        id: "user1"
      }
    },
    "ADD"
  );
  expect(actions).toEqual([
    {
      type: Types.ADD_REFERENCE_ENTITY,
      payload: {
        source: {
          type: "blogPost",
          id: "blogPost1"
        },
        target: {
          type: "author",
          id: "user1"
        }
      }
    },
    {}
  ]);
});
