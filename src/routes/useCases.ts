import { Router } from 'express';
import {
  getUseCases,
  getUseCaseByTechniqueId,
  createUseCase,
  deleteUseCase,
} from '../controllers/useCase';

const router = Router();

router.get('/', getUseCases);
router.get('/:techniqueId', getUseCaseByTechniqueId);
router.post('/', createUseCase);
router.delete('/:id', deleteUseCase);

export default router;
