import { Router } from 'express';
import {
  getEffectivenessStats,
  getEffectivenessStatsByTechniqueId,
  createEffectivenessStat,
  updateEffectivenessStat,
  deleteEffectivenessStat,
} from '../controllers/effectivenessStat';
import { validate } from '../middleware/validate';
import { createEffectivenessStatSchema } from '../validators/effectivenessStatValidator';

const router = Router();

router.get('/', getEffectivenessStats);
router.get('/:techniqueId', getEffectivenessStatsByTechniqueId);
router.post(
  '/',
  validate(createEffectivenessStatSchema),
  createEffectivenessStat
);
router.put('/', updateEffectivenessStat);
router.delete('/:id', deleteEffectivenessStat);

export default router;
