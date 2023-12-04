import { z } from 'zod';

const TopicSchema = z.object({
  idx: z.number(),
  name: z.string(),
  seq: z.number(),
  total_insights: z.number(),
});

export type Topic = z.infer<typeof TopicSchema>;
