import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const techniques = pgTable('study_techniques', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  shortDescription: text('short_description'),
  fullDescription: text('full_description'),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const effectivenessStats = pgTable('effectiveness_stats', {
  id: serial('id').primaryKey(),
  techniqueId: integer('technique_id').references(() => techniques.id, {
    onDelete: 'cascade',
  }),
  condition: varchar('condition', { length: 100 }).notNull(),
  effectivenessRating: integer('effectiveness_rating'),
  sampleSize: integer('sample_size'),
  sourceUrl: text('source_url'),
  notes: text('notes'),
});

export const useCases = pgTable('use_cases', {
  id: serial('id').primaryKey(),
  techniqueId: integer('technique_id').references(() => techniques.id, {
    onDelete: 'cascade',
  }),
  scenarioTitle: varchar('scenario_title', { length: 255 }),
  description: text('description'),
  recommendedFor: text('recommended_for'),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  techniqueId: integer('technique_id').references(() => techniques.id, {
    onDelete: 'cascade',
  }),
  title: varchar('title', { length: 255 }),
  url: text('url'),
  resourceType: varchar('resource_type', { length: 50 }),
});

export const techniqueRelations = relations(techniques, ({ many }) => ({
  effectivenessStats: many(effectivenessStats),
  useCases: many(useCases),
  resources: many(resources),
}));

export const effectivenessStatsRelations = relations(
  effectivenessStats,
  ({ one }) => ({
    technique: one(techniques, {
      fields: [effectivenessStats.techniqueId],
      references: [techniques.id],
    }),
  })
);

export const useCasesRelations = relations(useCases, ({ one }) => ({
  technique: one(techniques, {
    fields: [useCases.techniqueId],
    references: [techniques.id],
  }),
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  technique: one(techniques, {
    fields: [resources.techniqueId],
    references: [techniques.id],
  }),
}));
