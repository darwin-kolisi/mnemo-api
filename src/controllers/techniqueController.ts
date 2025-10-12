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
