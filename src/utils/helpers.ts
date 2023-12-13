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

export const makeQueryParams = (
  searchFilter?: string,
  selectedRoles?: string[],
  offset?: number,
  limit?: number,
  sorts?: string[],
) => {
  const andConditions = [];
  const orConditions: any[] = [];

  if (searchFilter && searchFilter !== '') {
    andConditions.push({ first_name: `like:${searchFilter}` });
    andConditions.push({ last_name: `like:${searchFilter}` });
    andConditions.push({ email: `like:${searchFilter}` });
  }

  if (selectedRoles && selectedRoles?.length > 0) {
    selectedRoles.forEach((r) => {
      orConditions.push({ role: r });
    });
  }

  const filterQuery = {
    and: andConditions.length <= 0 ? undefined : andConditions,
    or: orConditions.length <= 0 ? undefined : orConditions,
  };

  const sortsQuery = !sorts || sorts?.length <= 0 ? undefined : sorts;

  const queryParams = { filter: filterQuery, offset: offset, limit: limit, sorts: sortsQuery };

  return queryParams;
};
