import {
  schema,
  normalize as coreNormalize,
  denormalize as coreDenormalize
} from "normalizr";

export function makeSchema(name, definition) {
  const schemaDef = new schema.Entity(name, definition);
  return schemaDef;
}

export function normalize(data, schema) {
  const { meta, ...payload } = data;
  const {result, ...normalizedData} = coreNormalize(payload, schema);
  return normalizedData;
}

export function denormalize(data, schema, entities) {
  return coreDenormalize(data, schema, entities);
}
