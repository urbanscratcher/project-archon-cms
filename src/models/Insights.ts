import { z } from 'zod';
import { TopicSchema } from './Topic';
import { toCamelCase } from '../utils/helpers';
import { getListSchema } from './QueryParam';

export const CreatorSchema = z
  .object({
    idx: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string().optional(),
  })
  .transform((data) => toCamelCase(data));

export const InsightsFilterSchema = z.object({
  insight_idx: z.string().optional(),
  title: z.string().optional(),
  topic_idx: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  created_by: z.string().optional(),
});

export const InsightSchema = z
  .object({
    idx: z.number(),
    title: z.string(),
    thumbnail: z.string().optional(),
    summary: z.string().optional(),
    content: z.string().optional(),
    topic: TopicSchema,
    created_by: CreatorSchema,
    created_at: z.coerce.date(),
    edited_at: z.coerce.date().optional(),
  })
  .transform((data) => toCamelCase(data));

export const InsightsSchema = getListSchema(InsightSchema);

export type Insight = z.infer<typeof InsightSchema>;
export type Insights = z.infer<typeof InsightsSchema>;
export type InsightsFilter = z.infer<typeof InsightsFilterSchema>;
