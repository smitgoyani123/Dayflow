import express from 'express';
import {
    getMyPayroll,
    getAllPayroll,
    createPayrollRecord,
    updatePayrollStatus,
} from '../controllers/payrollController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getAllPayroll)
    .post(protect, admin, createPayrollRecord);

router.route('/my').get(protect, getMyPayroll);

router.route('/:id').put(protect, admin, updatePayrollStatus);

export default router;
