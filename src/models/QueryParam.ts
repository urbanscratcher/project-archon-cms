import { ZodTypeAny, z } from 'zod';

export type QueryParam = {
  filter?: any;
  sorts?: string[];
  offset?: number;
  limit?: number;
};

export function getQueryStr(filterSchema: any) {
  return z
    .object({
      offset: z.number().int().min(0, 'Minimum 0').default(0).optional(),
      limit: z.number().int().min(1, 'Minimum 1').max(100, 'Maximum 100').default(10).optional(),
      sorts: z
        .string()
        .array()
        .optional()
        .transform((data) => (data ? JSON.stringify(data) : undefined)),
      filter: z
        .object({
          or: z.array(filterSchema).optional(),
          and: z.array(filterSchema).optional(),
        })
        .optional()
        .transform((data) => data && JSON.stringify(data)),
    })
    .transform((data) => {
      const paramList = [];
      if (data?.filter) paramList.push(`filter=${data?.filter}`);
      if (data?.sorts) paramList.push(`sorts=${data?.sorts}`);
      if (data?.offset) paramList.push(`offset=${data?.offset}`);
      if (data?.limit) paramList.push(`limit=${data?.limit}`);

      return paramList.length > 0 ? '?' + paramList.join('&') : '';
    });
}

export const getListSchema = (dataSchema: ZodTypeAny) => {
  return z.object({
    total: z.number(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    data: z.array(dataSchema),
  });
};
