import express from 'express';
import {
    checkIn,
    checkOut,
    getMyAttendance,
    getAllAttendance,
    getAttendanceByUserId,
} from '../controllers/attendanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getAllAttendance);

router.route('/checkin').post(protect, checkIn);
router.route('/checkout').put(protect, checkOut);
router.route('/my').get(protect, getMyAttendance);

router.route('/employee/:id').get(protect, admin, getAttendanceByUserId);

export default router;
