import { z } from 'zod';
import { toCamelCase } from '../utils/helpers';
import { getListSchema } from './QueryParam';

export const CoverSchema = z
  .object({
    idx: z.number(),
    insight: z.object({
      idx: z.number(),
      thumbnail: z.string().optional(),
      title: z.string(),
    }),
    is_main: z.boolean(),
    topic: z.object({
      idx: z.number(),
      name: z.string(),
    }),
  })
  .transform((data) => toCamelCase(data));

export const CoversSchema = getListSchema(CoverSchema);

export type Cover = z.infer<typeof CoverSchema>;
export type Covers = z.infer<typeof CoversSchema>;
