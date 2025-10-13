import { z } from 'zod';

export const createUseCaseSchema = z.object({
  techniqueId: z.number().int().positive(),
  scenarioTitle: z.string().max(255).optional(),
  description: z.string().optional(),
  recommendedFor: z.string().optional(),
});
