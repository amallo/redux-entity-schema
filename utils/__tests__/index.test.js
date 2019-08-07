import { uuid } from "../index";

it("generates an uuid", () => {
  expect(uuid()).toBe("UUID1");
});
