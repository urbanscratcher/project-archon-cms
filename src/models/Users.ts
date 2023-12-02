import { z } from 'zod';
import { toCamelCase } from '../utils/helpers';
import { getListSchema } from './QueryParam';

export const RoleSchema = z.union([z.literal('admin'), z.literal('user'), z.literal('editor'), z.literal('writer')]);

export const UsersFilterSchema = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  role: RoleSchema.optional(),
});

const UserSchema = z
  .object({
    idx: z.number(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: RoleSchema,
    careers: z.string().optional(),
    avatar: z.string().optional(),
    job_title: z.string().optional(),
    biography: z.string().optional(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional(),
    topics: z
      .array(
        z.object({
          idx: z.number(),
          name: z.string(),
          seq: z.number(),
        }),
      )
      .optional(),
  })
  .transform((data) => toCamelCase(data));

export const UsersSchema = getListSchema(UserSchema);

export type Role = z.infer<typeof RoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;
export type UsersFilter = z.infer<typeof UsersFilterSchema>;
