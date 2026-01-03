import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

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
        status: 'Present', // Or logic to determine late arrival
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
    const hours = (attendance.checkOut - attendance.checkIn) / 36e5; // diff in hours
    attendance.totalHours = hours.toFixed(2);

    const updatedAttendance = await attendance.save();
    res.json(updatedAttendance);
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
    // Populate the employeeId field with the full Employee object
    const attendance = await Attendance.find({}).populate('employeeId', 'firstName lastName designation').sort({ date: -1 });
    res.json(attendance);
};

// @desc    Get attendance by User ID (Admin)
// @route   GET /api/attendance/user/:id
// @access  Private/Admin
const getAttendanceByUserId = async (req, res) => {
    // Assuming passed ID is the User ID or Employee ID? Let's assume Employee ID for direct access
    // But if we want by User ID, we need to look up Employee first.
    // Let's assume the params.id is the EMPLOYEE ID (the _id of the employee document)
    const employeeId = req.params.id;
    const attendance = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.json(attendance);
};

export { checkIn, checkOut, getMyAttendance, getAllAttendance, getAttendanceByUserId };
