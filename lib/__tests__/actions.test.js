import {
  createEntityActions,
  mergeEntityById,
  updateEntityById,
  Types,
  planActions
} from "../actions";
import { makeSchema } from "../schema";

it("merge a blog post entity", () => {
  const schema = makeSchema("blogPost");
  const actions = createEntityActions(schema);
  expect(
    actions.mergeEntity({
      id: 1
    })
  ).toEqual({
    type: Types.MERGE_ENTITY,
    payload: {
      id: 1
    },
    meta: {
      schema
    }
  });
});

it("updates a blog post entity", () => {
  const schema = makeSchema("blogPost");
  const actions = createEntityActions(schema);
  expect(
    actions.updateEntity({
      id: 1
    })
  ).toEqual({
    type: Types.UPDATE_ENTITY,
    payload: {
      id: 1
    },
    meta: {
      schema
    }
  });
});

it("merges an entity by id", () => {
  expect(
    mergeEntityById("blogPost", {
      id: 1
    })
  ).toEqual({
    type: Types.MERGE_ENTITY_BY_ID,
    payload: {
      id: 1
    },
    meta: {
      entity: "blogPost"
    }
  });
});

it("updates an entity by id", () => {
  expect(
    updateEntityById("blogPost", {
      id: 1,
      date: "now"
    })
  ).toEqual({
    type: Types.UPDATE_ENTITY_BY_ID,
    payload: {
      id: 1,
      date: "now"
    },
    meta: {
      entity: "blogPost"
    }
  });
});

describe("plan entity actions", () => {
  const authorSchema = makeSchema("author");
  const schema = makeSchema("blogPost", {
    author: authorSchema
  });
  const actions = createEntityActions(schema);
  it("plans merge", () => {
    const plannedActions = planActions(
      actions.mergeEntity({
        id: 1,
        author: {
          id: 2
        }
      })
    );
    expect(plannedActions.length).toBe(2);
    expect(plannedActions).toContainEqual(
      mergeEntityById("blogPost", {
        1: {
          id: 1,
          author: 2
        }
      })
    );
    expect(plannedActions).toContainEqual(
      mergeEntityById("author", {
        2: {
          id: 2
        }
      })
    );
  });

  it("plans update", () => {
    const plannedActions = planActions(
      actions.updateEntity({
        id: 1,
        author: {
          id: 2
        }
      })
    );
    expect(plannedActions.length).toBe(2);
    expect(plannedActions).toContainEqual(
      updateEntityById("blogPost", {
        1: {
          id: 1,
          author: 2
        }
      })
    );
    expect(plannedActions).toContainEqual(
      mergeEntityById("author", {
        2: {
          id: 2
        }
      })
    );
  });
});
