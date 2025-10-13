import { Router } from 'express';
import {
  getUseCases,
  getUseCaseByTechniqueId,
  createUseCase,
  deleteUseCase,
} from '../controllers/useCase';
import { validate } from '../middleware/validate';
import { createUseCaseSchema } from '../validators/useCaseValidator';

const router = Router();

router.get('/', getUseCases);
router.get('/:techniqueId', getUseCaseByTechniqueId);
router.post('/', validate(createUseCaseSchema), createUseCase);
router.delete('/:id', deleteUseCase);

export default router;
