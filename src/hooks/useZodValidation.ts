import { z } from 'zod';

function checkValidValue(target: Object, schema: z.ZodObject<any, any>): string | null {
  const result = schema.safeParse(target);

  const error = result.success ? null : result.error.issues[0].message;

  return error;
}

export default checkValidValue;
