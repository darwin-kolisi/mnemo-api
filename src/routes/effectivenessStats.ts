import { Router } from 'express';
import { getEffectivenessStats, getEffectivenessStatsByTechniqueId, createEffectivenessStat, updateEffectivenessStat, deleteEffectivenessStat } from '../controllers/effectivenessStat';

const router = Router();

router.get('/', getEffectivenessStats);
router.get('/:techniqueId', getEffectivenessStatsByTechniqueId);
router.post('/', createEffectivenessStat);
router.put('/', updateEffectivenessStat);
router.delete('/:id', deleteEffectivenessStat);


export default router;
