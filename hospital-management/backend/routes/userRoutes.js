import express from 'express';
import { getAllDoctors, getDepartments } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/doctors', protect, getAllDoctors);
router.get('/departments', protect, getDepartments);

export default router;
