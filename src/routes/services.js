import { Router } from 'express';
import { getAllServices, getServiceById, addReview } from '../controllers/serviceController.js';

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/review', addReview);

export default router;