import express from 'express';
import { createAppointment, getMyAppointments, getDoctorAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { protect, doctor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/my', protect, getMyAppointments);
router.get('/doctor', protect, doctor, getDoctorAppointments);
router.put('/:id/status', protect, updateAppointmentStatus);

export default router;
