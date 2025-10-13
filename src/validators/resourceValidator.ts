import { z } from 'zod';

export const createResourceSchema = z.object({
  techniqueId: z.number().int().positive(),
  title: z.string().max(255).optional(),
  url: z.string().url('Must be a valid URL').optional(),
  resourceType: z.string().max(50).optional(),
});
