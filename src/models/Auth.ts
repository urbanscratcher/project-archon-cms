import { z } from 'zod';

export const EmailSchema = z.object({
  email: z.string().nonempty('Required').email('Not Email format').max(255, 'Maximum 255'),
});

export const PasswordSchema = z.object({
  password: z.string().nonempty('Required').min(8, 'Minimum 8').max(24, 'Maximum 24'),
});

const SignInSchema = EmailSchema.merge(PasswordSchema);

export const SignUpSchema = EmailSchema.extend({
  password: z
    .string()
    .nonempty('Required')
    .min(8, { message: 'Minimum 8' })
    .regex(new RegExp('^(?=.*[0-9a-zA-Z])(?=.*[!@#$%^&*]).{8,}$'), {
      message: 'At least 1 number and symbol',
    }),
  first_name: z.string().nonempty('Required').max(50, { message: 'Maximum 50' }),
  last_name: z.string().nonempty('Required').max(50, { message: 'Maximum 50' }),
  password_confirm: z.string().nonempty('Required'),
}).refine((schema) => schema.password === schema.password_confirm, {
  message: 'Not matched',
  path: ['password_confirm'],
});

export const AccountSchema = z
  .object({
    past_password: z
      .string()
      .min(8, { message: 'Minimum 8' })
      .regex(new RegExp('^(?=.*[0-9a-zA-Z])(?=.*[!@#$%^&*]).{8,}$'), {
        message: 'At least 1 number and symbol',
      }),
    new_password: z
      .union([
        z.string().length(0, { message: 'Minimum 8 & 1 number and symbol' }),
        z.string().min(8, { message: 'Minimum 8' }).regex(new RegExp('^(?=.*[0-9a-zA-Z])(?=.*[!@#$%^&*]).{8,}$'), {
          message: 'At least 1 number and symbol',
        }),
      ])
      .optional()
      .transform((e) => (e === '' ? undefined : e)),
    new_password_confirm: z
      .string()
      .optional()
      .transform((e) => (e === '' ? undefined : e)),
  })
  .refine((schema) => schema.new_password_confirm === schema.new_password, {
    message: 'Not matched',
    path: ['password_confirm'],
  });

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type Account = z.infer<typeof AccountSchema>;
