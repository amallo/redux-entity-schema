import { schema, normalize as coreNormalize } from "normalizr";

export function makeSchema(name, fields) {
  const schemaDef = new schema.Entity(name, fields);
  return schemaDef;
}

export function normalize(data, schema) {
  const { meta, ...payload } = data;
  const { result, ...normalizedData } = coreNormalize(payload, schema);
  return normalizedData;
}
