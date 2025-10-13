import { Request, Response } from 'express';
import { db } from '../db';
import { useCases } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getUseCases(req: Request, res: Response) {
  try {
    const allUseCases = await db.select().from(useCases);
    res.json(allUseCases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch use cases' });
  }
}

export async function getUseCaseByTechniqueId(req: Request, res: Response) {
  try {
    const techniqueId = parseInt(req.params.techniqueId);
    const techniqueUseCases = await db
      .select()
      .from(useCases)
      .where(eq(useCases.techniqueId, techniqueId));

    if (techniqueUseCases.length === 0) {
      return res
        .status(404)
        .json({ error: 'No use cases found for this technique' });
    }
    res.json(techniqueUseCases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch use cases' });
  }
}

export async function createUseCase(req: Request, res: Response) {
  try {
    const { techniqueId, scenarioTitle, description, recommendedFor } =
      req.body;
    const newUseCase = await db
      .insert(useCases)
      .values({
        techniqueId,
        scenarioTitle,
        description,
        recommendedFor,
      })
      .returning();
    res.status(201).json(newUseCase[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create use case' });
  }
}

export async function deleteUseCase(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const deleted = await db
      .delete(useCases)
      .where(eq(useCases.id, id))
      .returning();
    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Use case not found' });
    }
    res.json({ message: 'Use case deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete use case' });
  }
}
