import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    name: z.string().max(100, 'Name must be at most 100 characters'),
    email: z.string().email('Invalid email format').max(254, 'Email too long'),
    password: z.string().max(255, 'Password too long'),
    isActive: z.boolean().optional(),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export type UserReq = z.infer<typeof CreateUserSchema>;
export type LoginReq = z.infer<typeof LoginSchema>;
