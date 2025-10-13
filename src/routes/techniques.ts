import { Router } from 'express';
import {
  getTechniques,
  createTechnique,
  getTechniqueById,
  updateTechnique,
  deleteTechnique,
} from '../controllers/technique';
import { validate } from '../middleware/validate';
import {
  createTechniqueSchema,
  updateTechniqueSchema,
} from '../validators/techniqueValidator';

const router = Router();

router.get('/', getTechniques);
router.post('/', validate(createTechniqueSchema), createTechnique);
router.get('/:id', getTechniqueById);
router.put('/:id', validate(updateTechniqueSchema), updateTechnique);
router.delete('/:id', deleteTechnique);

export default router;
