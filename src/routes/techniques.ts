import { Router } from 'express';
import {
  getTechniques,
  createTechnique,
  getTechniqueById,
  updateTechnique,
  deleteTechnique,
} from '../controllers/technique';

const router = Router();

router.get('/', getTechniques);
router.post('/', createTechnique);
router.get('/:id', getTechniqueById);
router.put('/:id', updateTechnique);
router.delete('/:id', deleteTechnique);

export default router;
