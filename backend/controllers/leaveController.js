import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

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
    const { status, adminComment } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (leave) {
        leave.status = status;
        if (adminComment) {
            leave.adminComment = adminComment;
        }
        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } else {
        res.status(404);
        throw new Error('Leave request not found');
    }
};

export { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus };
