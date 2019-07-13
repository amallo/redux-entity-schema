import { entityActionType, entityActionName } from "../helper";

describe("schema", () => {
  let schema = {};
  beforeEach(() => {
    schema = {
      key: "blogPost"
    };
  });
  const operationTypes = ["ADD"];
  operationTypes.forEach(operationType => {
    it("returns entity type from a schema and an operation type", () => {
      expect(entityActionType(operationType)).toBe(
        operationType.toUpperCase() + "_" + "ENTITY"
      );
    });
  });

  it("returns action name from action type", () => {
    expect(entityActionName("ADD_BLOG_POST_ENTITY")).toBe("addBlogPostEntity");
  });
});
