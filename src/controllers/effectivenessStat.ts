import { Request, Response } from 'express';
import { db } from '../db';
import { effectivenessStats } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getEffectivenessStats = async (req: Request, res: Response) => {
  try {
    const { condition, techniqueId } = req.query;

    let query: any = db.select().from(effectivenessStats);

    if (condition && typeof condition === 'string') {
      query = query.where(eq(effectivenessStats.condition, condition));
    }

    if (techniqueId) {
      query = query.where(
        eq(effectivenessStats.techniqueId, parseInt(techniqueId as string))
      );
    }

    const stats = await query;
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch effectiveness stats' });
  }
};

export const getEffectivenessStatsByTechniqueId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const [stat] = await db
      .select()
      .from(effectivenessStats)
      .where(eq(effectivenessStats.id, Number(id)));

    if (!stat)
      return res
        .status(404)
        .json({ error: 'No stat found for this technique' });

    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch effectiveness stat' });
  }
};

export const createEffectivenessStat = async (req: Request, res: Response) => {
  try {
    const newStat = await db
      .insert(effectivenessStats)
      .values(req.body)
      .returning();
    res.status(201).json(newStat[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create effectiveness stat' });
  }
};

export const updateEffectivenessStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await db
      .update(effectivenessStats)
      .set(req.body)
      .where(eq(effectivenessStats.id, Number(id)))
      .returning();

    if (!updated.length)
      return res.status(404).json({ error: 'Stat not found' });

    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update effectiveness stat' });
  }
};

export const deleteEffectivenessStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db
      .delete(effectivenessStats)
      .where(eq(effectivenessStats.id, Number(id)));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete effectiveness stat' });
  }
};
