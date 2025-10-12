import { Router } from 'express';
import {
  getTechniques,
  createTechnique,
} from '../controllers/techniqueController';

const router = Router();

router.get('/', getTechniques);
router.post('/', createTechnique);

export default router;
