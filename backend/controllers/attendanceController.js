import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

// @desc    Check in
// @route   POST /api/attendance/checkin
// @access  Private
// @desc    Check in
// @route   POST /api/attendance/checkin
// @access  Private
const checkIn = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found for this user');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
        employeeId: employee._id,
        date: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
    });

    if (existingAttendance) {
        res.status(400);
        throw new Error('Already checked in for today');
    }

    const attendance = await Attendance.create({
        employeeId: employee._id,
        date: new Date(),
        checkIn: new Date(),
        status: 'Present',
    });

    res.status(201).json(attendance);
};

// @desc    Check out
// @route   PUT /api/attendance/checkout
// @access  Private
const checkOut = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
        employeeId: employee._id,
        date: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
    });

    if (!attendance) {
        res.status(400);
        throw new Error('No check-in record found for today');
    }

    attendance.checkOut = new Date();

    // Calculate total hours
    const diffMs = attendance.checkOut - attendance.checkIn;
    const hours = diffMs / (1000 * 60 * 60);
    attendance.totalHours = hours.toFixed(2);

    // Update Status based on hours (Threshold: 4 hours for Half-day)
    if (hours < 4) {
        attendance.status = 'Half-day';
    } else {
        attendance.status = 'Present';
    }

    const updatedAttendance = await attendance.save();
    res.json(updatedAttendance);
};

// @desc    Get current status (Today) - Helper for frontend button state
// @route   GET /api/attendance/status
// @access  Private
const getAttendanceStatus = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        return res.json({ status: 'Idle' }); // Or error, but Idle is safer for UI
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
        employeeId: employee._id,
        date: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
    });

    if (!attendance) {
        return res.json({ status: 'Idle' }); // User hasn't checked in
    }

    if (attendance.checkIn && !attendance.checkOut) {
        return res.json({
            status: 'CheckedIn',
            checkInTime: attendance.checkIn
        });
    }

    if (attendance.checkIn && attendance.checkOut) {
        return res.json({
            status: 'CheckedOut',
            checkInTime: attendance.checkIn,
            checkOutTime: attendance.checkOut,
            totalHours: attendance.totalHours
        });
    }

    res.json({ status: 'Idle' });
};

// @desc    Get my attendance
// @route   GET /api/attendance/my
// @access  Private
const getMyAttendance = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found');
    }

    const attendance = await Attendance.find({ employeeId: employee._id }).sort({ date: -1 });
    res.json(attendance);
};

// @desc    Get all attendance (Admin)
// @route   GET /api/attendance
// @access  Private/Admin
const getAllAttendance = async (req, res) => {
    const attendance = await Attendance.find({}).populate('employeeId', 'firstName lastName designation').sort({ date: -1 });
    res.json(attendance);
};

// @desc    Get attendance by User ID (Admin)
// @route   GET /api/attendance/user/:id
// @access  Private/Admin
const getAttendanceByUserId = async (req, res) => {
    const employeeId = req.params.id;
    const attendance = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.json(attendance);
};

export { checkIn, checkOut, getMyAttendance, getAllAttendance, getAttendanceByUserId, getAttendanceStatus };
