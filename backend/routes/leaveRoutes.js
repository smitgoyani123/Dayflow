import express from 'express';
import {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
} from '../controllers/leaveController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, applyLeave)
    .get(protect, admin, getAllLeaves);

router.route('/my').get(protect, getMyLeaves);

router.route('/:id').put(protect, admin, updateLeaveStatus);

export default router;
