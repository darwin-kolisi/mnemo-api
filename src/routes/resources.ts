import { Router } from 'express';
import {
  getResources,
  getResourcesByTechniqueId,
  createResource,
  deleteResource,
} from '../controllers/resource';

const router = Router();

router.get('/', getResources);
router.get('/:techniqueId', getResourcesByTechniqueId);
router.post('/', createResource);
router.delete('/:id', deleteResource);

export default router;
