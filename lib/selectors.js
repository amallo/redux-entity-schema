import _ from "lodash";
import { denormalize } from "./schema";

export function matches(source) {
  return _.matches(source);
}
export function createEntityActionSelectors(schema) {
  return {
    findAll: (state, params) => {}
  };
}
