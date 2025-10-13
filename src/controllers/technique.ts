import { Request, Response } from 'express';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { techniques } from '../db/schema';

export async function getTechniques(req: Request, res: Response) {
  try {
    const allTechniques = await db.select().from(techniques);
    res.json(allTechniques);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch techniques' });
  }
}

export async function createTechnique(req: Request, res: Response) {
  try {
    const { name, shortDescription, fullDescription, category } = req.body;

    const newTechnique = await db
      .insert(techniques)
      .values({
        name,
        shortDescription,
        fullDescription,
        category,
      })
      .returning();

    res.status(201).json(newTechnique[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create technique' });
  }
}

export async function getTechniqueById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const technique = await db
      .select()
      .from(techniques)
      .where(eq(techniques.id, id));

    if (technique.length === 0) {
      return res.status(404).json({ error: 'Technique not found' });
    }

    res.json(technique[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch technique' });
  }
}

export async function updateTechnique(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { name, shortDescription, fullDescription, category } = req.body;

    const updated = await db
      .update(techniques)
      .set({ name, shortDescription, fullDescription, category })
      .where(eq(techniques.id, id))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Technique not found' });
    }

    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update technique' });
  }
}

export async function deleteTechnique(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const deleted = await db
      .delete(techniques)
      .where(eq(techniques.id, id))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Technique not found' });
    }

    res.json({ message: 'Technique deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete technique' });
  }
}
