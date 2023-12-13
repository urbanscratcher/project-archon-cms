import { z } from 'zod';

export const TopicSchema = z.object({
  idx: z.number(),
  name: z.string(),
  seq: z.number().optional(),
  total_insights: z.number().optional(),
});

export type Topic = z.infer<typeof TopicSchema>;
