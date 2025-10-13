import { z } from 'zod';

export const createTechniqueSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  category: z.string().max(100).optional(),
});

export const updateTechniqueSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  category: z.string().max(100).optional(),
});
