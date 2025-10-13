import {
  techniques,
  effectivenessStats,
  useCases,
  resources,
} from '../db/schema';

export type Technique = typeof techniques.$inferSelect;
export type NewTechnique = typeof techniques.$inferInsert;

export type EffectivenessStat = typeof effectivenessStats.$inferSelect;
export type NewEffectivenessStat = typeof effectivenessStats.$inferInsert;

export type UseCase = typeof useCases.$inferSelect;
export type NewUseCase = typeof useCases.$inferInsert;

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
