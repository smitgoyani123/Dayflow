import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

// Helper to calculate days between dates (inclusive)
const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
};

// @desc    Apply for leave
// @route   POST /api/leaves
// @access  Private
const applyLeave = async (req, res) => {
    const { leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found');
    }

    if (new Date(startDate) > new Date(endDate)) {
        res.status(400);
        throw new Error('End date must be after start date');
    }

    // Optional: Check if days requested exceed balance immediately (Strict vs Lenient)
    // For now we allow request, but approval might fail if balance is low, 
    // OR we check here. Let's check here to be helpful.
    const daysRequested = calculateDays(startDate, endDate);
    const currentBalance = employee.leaveBalance.get(leaveType) || 0;

    // Only check balance if it's not 'Unpaid Leave' (assuming unpaid is unlimited or manually tracked)
    if (leaveType !== 'Unpaid Leave' && currentBalance < daysRequested) {
        res.status(400);
        throw new Error(`Insufficient leave balance. You have ${currentBalance} days of ${leaveType} remaining.`);
    }

    const leave = await Leave.create({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
    });

    res.status(201).json(leave);
};

// @desc    Get my leaves
// @route   GET /api/leaves/my
// @access  Private
const getMyLeaves = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found');
    }

    const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });
    res.json(leaves);
};

// @desc    Get all leave requests (Admin)
// @route   GET /api/leaves
// @access  Private/Admin
const getAllLeaves = async (req, res) => {
    const leaves = await Leave.find({}).populate('employeeId', 'firstName lastName designation').sort({ createdAt: -1 });
    res.json(leaves);
};

// @desc    Update leave status (Admin)
// @route   PUT /api/leaves/:id
// @access  Private/Admin
const updateLeaveStatus = async (req, res) => {
    const { status, adminComment } = req.body; // status: 'Approved' | 'Rejected'

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
        res.status(404);
        throw new Error('Leave request not found');
    }

    if (leave.status !== 'Pending') {
        res.status(400);
        throw new Error(`Leave request is already ${leave.status}`);
    }

    const employee = await Employee.findById(leave.employeeId);
    if (!employee) {
        res.status(404);
        throw new Error('Employee associated with this leave not found');
    }

    if (status === 'Approved') {
        const days = calculateDays(leave.startDate, leave.endDate);
        const type = leave.leaveType;

        if (type !== 'Unpaid Leave') {
            const currentBalance = employee.leaveBalance.get(type) || 0;
            if (currentBalance < days) {
                res.status(400);
                throw new Error(`Cannot approve. Employee has insufficient balance (${currentBalance} days) for this request (${days} days).`);
            }

            // Deduct balance
            employee.leaveBalance.set(type, currentBalance - days);
            await employee.save();
        }
    }

    leave.status = status;
    if (adminComment) {
        leave.adminComment = adminComment;
    }
    const updatedLeave = await leave.save();
    res.json(updatedLeave);
};

export { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus };
