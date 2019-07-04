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
describe("one to one relationship", () => {
  it("add one to one relationship", () => {
    const schema = {
      name: "blogPost",
      fields: {
        id: {
          type: "string"
        },
        author: {
          type: "oneToOne",
          schema: "author",
          target: "user1"
        }
      }
    };
    const addOneToOneAction = createOneToOneActions(schema, "ADD");
    const actions = addOneToOneAction({
      id: "blogPost1",
      author: "user1"
    });
    expect(actions).toEqual([
      {
        type: Types.ADD_ONE_TO_ONE_ENTITY,
        payload: {
          kind: "oneToOne",
          source: {
            type: "blogPost",
            id: "blogPost1"
          },
          target: {
            type: "author",
            id: "user1"
          }
        }
      }
    ]);
  });
});
