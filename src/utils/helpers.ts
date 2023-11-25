import { camelCase, isArray, isObject, snakeCase, transform } from 'lodash';

export function toCamelCase(obj: any) {
  return transform(obj, (acc: any, value: any, key: any, target: any) => {
    const snakeKey = isArray(target) ? key : camelCase(key);
    acc[snakeKey] = isObject(value) ? toCamelCase(value) : value;
  });
}

export function toSnakeCase(obj: any) {
  return transform(obj, (acc: any, value: any, key: any, target: any) => {
    const camelKey = isArray(target) ? key : snakeCase(key);
    acc[camelKey] = isObject(value) ? toSnakeCase(value) : value;
  });
}
