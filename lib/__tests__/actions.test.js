import { createEntityActions, addEntityById, ActionTypes } from "../actions";
import { makeSchema } from "../schema";

it("add a blog post entity", () => {
  const schema = makeSchema("blogPost");
  const { Creators, Types } = createEntityActions(schema);
  expect(Types.ADD_ENTITY).toBeDefined();
  expect(
    Creators.addEntity({
      id: 1
    })
  ).toEqual({
    type: Types.ADD_ENTITY,
    payload: {
      id: 1
    },
    meta: {
      schema
    }
  });
});

it("adds an entity by id", () => {
  const schema = makeSchema("blogPost");
  expect(
    addEntityById(schema, {
      id: 1
    })
  ).toEqual({
    type: ActionTypes.ADD_ENTITY_BY_ID,
    payload: {
      id: 1
    },
    meta: {
      schema
    }
  });
});
