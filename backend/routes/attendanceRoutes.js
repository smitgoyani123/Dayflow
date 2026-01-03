import express from 'express';
import {
    checkIn,
    checkOut,
    getMyAttendance,
    getAllAttendance,
    getAttendanceByUserId,
    getAttendanceStatus,
} from '../controllers/attendanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkin', protect, checkIn);
router.put('/checkout', protect, checkOut);
router.get('/my', protect, getMyAttendance);
router.get('/status', protect, getAttendanceStatus);

router.route('/')
    .get(protect, admin, getAllAttendance);

router.route('/employee/:id')
    .get(protect, admin, getAttendanceByUserId);

export default router;
