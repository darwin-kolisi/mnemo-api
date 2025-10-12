import { Request, Response } from 'express';
import { db } from '../db';
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
