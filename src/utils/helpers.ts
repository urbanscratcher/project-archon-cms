import { camelCase, isArray, isDate, isObject, snakeCase, transform } from 'lodash';

export function toCamelCase(obj: any) {
  return transform(obj, (acc: any, value: any, key: any, target: any) => {
    const snakeKey = isArray(target) ? key : camelCase(key);
    acc[snakeKey] = isObject(value) ? (isDate(value) ? value : toCamelCase(value)) : value;
  });
}

export function toSnakeCase(obj: any) {
  return transform(obj, (acc: any, value: any, key: any, target: any) => {
    const camelKey = isArray(target) ? key : snakeCase(key);
    acc[camelKey] = isObject(value) ? toSnakeCase(value) : value;
  });
}

export function isExceedWordLimit(text: string, wordLimit: number): boolean {
  let flag = false;
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount > wordLimit) {
    flag = true;
  }
  return flag;
}

export function isExceedCharLimit(text: string, charLimit: number): boolean {
  let flag = false;
  const wordCount = text.trim().split('').length;
  if (wordCount > charLimit) {
    flag = true;
  }
  return flag;
}
