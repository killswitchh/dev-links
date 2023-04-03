import { z } from 'zod';

export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

export type CreateUserRequest = {
  name: string;
  email: string;
};

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  active: z.boolean().default(true),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
