import { z } from 'zod';
import { TopicSchema } from './Topic';
import { toCamelCase } from '../utils/helpers';
import { getListSchema } from './QueryParam';

export const CreatorSchema = z.object({
  idx: z.number(),
  first_name: z.string(),
  last_name: z.string(),
});

const InsightSchema = z
  .object({
    idx: z.number(),
    title: z.string(),
    thumbnail: z.string().optional(),
    summary: z.string().optional(),
    content: z.string().optional(),
    topic: TopicSchema,
    created_by: CreatorSchema,
    created_at: z.coerce.date(),
  })
  .transform((data) => toCamelCase(data));

export const InsightsSchema = getListSchema(InsightSchema);

export type Insight = z.infer<typeof InsightSchema>;
export type Insights = z.infer<typeof InsightsSchema>;
