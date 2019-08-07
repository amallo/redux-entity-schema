import {
  schema,
  normalize as coreNormalize,
  denormalize as coreDenormalize
} from "normalizr";

import { uuid } from "../utils/index";

export function makeSchema(name, definition) {
  const schemaDef = new schema.Entity(name, definition);
  return schemaDef;
}

function idTransformer(payload) {
  return payload;
}
export function withIdTransformer(payload) {
  return payload.id
    ? payload
    : {
        ...payload,
        id: uuid()
      };
}

export function normalize(data, schema, transformer = idTransformer) {
  const { meta, ...payload } = data;
  const transformedPayload = transformer(payload);
  const { result, ...normalizedData } = coreNormalize(
    transformedPayload,
    schema
  );
  return normalizedData;
}

export function denormalize(data, schema, entities) {
  return coreDenormalize(data, schema, entities);
}
