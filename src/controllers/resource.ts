import { Request, Response } from 'express';
import { db } from '../db';
import { resources } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getResources(req: Request, res: Response) {
  try {
    const allResources = await db.select().from(resources);
    res.json(allResources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
}

export async function getResourcesByTechniqueId(req: Request, res: Response) {
  try {
    const techniqueId = parseInt(req.params.techniqueId);
    const techniqueResources = await db
      .select()
      .from(resources)
      .where(eq(resources.techniqueId, techniqueId));

    if (techniqueResources.length === 0) {
      return res
        .status(404)
        .json({ error: 'No resources found for this technique' });
    }
    res.json(techniqueResources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
}

export async function createResource(req: Request, res: Response) {
  try {
    const { techniqueId, title, url, resourceType } = req.body;
    const newResource = await db
      .insert(resources)
      .values({
        techniqueId,
        title,
        url,
        resourceType,
      })
      .returning();
    res.status(201).json(newResource[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
}

export async function deleteResource(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const deleted = await db
      .delete(resources)
      .where(eq(resources.id, id))
      .returning();
    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
}
