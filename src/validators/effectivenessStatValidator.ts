import { z } from 'zod';

export const createEffectivenessStatSchema = z.object({
  techniqueId: z.number().int().positive(),
  condition: z.string().min(1, 'Condition is required').max(100),
  effectivenessRating: z.number().int().min(1).max(10).optional(),
  sampleSize: z.number().int().positive().optional(),
  sourceUrl: z.string().url().optional(),
  notes: z.string().optional(),
});
