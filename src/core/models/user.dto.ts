import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  active: z.boolean().default(true),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
