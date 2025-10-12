import { Router } from 'express';
import { getTechniques } from '../controllers/techniqueController';

const router = Router();

router.get('/', getTechniques);

export default router;
