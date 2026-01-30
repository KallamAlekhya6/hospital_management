import express from 'express';
import {
    getStats,
    getAllDoctors,
    addDoctor,
    getAllPatients,
    toggleUserStatus,
    getAllAppointments,
    addDepartment,
    getDepartments,
    deleteDepartment
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/stats', getStats);
router.get('/doctors', getAllDoctors);
router.post('/doctors', addDoctor);
router.get('/patients', getAllPatients);
router.put('/users/:id/status', toggleUserStatus);
router.get('/appointments', getAllAppointments);

router.route('/departments')
    .get(getDepartments)
    .post(addDepartment);

router.delete('/departments/:id', deleteDepartment);

export default router;
