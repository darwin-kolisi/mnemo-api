import { Router } from 'express';
import {
  getResources,
  getResourcesByTechniqueId,
  createResource,
  deleteResource,
} from '../controllers/resource';
import { validate } from '../middleware/validate';
import { createResourceSchema } from '../validators/resourceValidator';

const router = Router();

router.get('/', getResources);
router.get('/:techniqueId', getResourcesByTechniqueId);
router.post('/', validate(createResourceSchema), createResource);
router.delete('/:id', deleteResource);

export default router;
