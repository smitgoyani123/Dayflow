import Payroll from '../models/Payroll.js';
import Employee from '../models/Employee.js';

// @desc    Get my payroll history
// @route   GET /api/payroll/my
// @access  Private
const getMyPayroll = async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee record not found');
    }

    const payroll = await Payroll.find({ employeeId: employee._id }).sort({ year: -1, month: -1 });
    res.json(payroll);
};

// @desc    Get all payroll records (Admin)
// @route   GET /api/payroll
// @access  Private/Admin
const getAllPayroll = async (req, res) => {
    const payroll = await Payroll.find({}).populate('employeeId', 'firstName lastName designation').sort({ year: -1, month: 1 });
    res.json(payroll);
};

// @desc    Create/Process payroll record (Admin)
// @route   POST /api/payroll
// @access  Private/Admin
const createPayrollRecord = async (req, res) => {
    const { employeeId, month, year, baseSalary, deductions, bonuses, status } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
    }

    // Check if payroll already exists for this month/year for this employee
    const existingPayroll = await Payroll.findOne({ employeeId, month, year });
    if (existingPayroll) {
        res.status(400);
        throw new Error('Payroll record already exists for this period');
    }

    const netSalary = baseSalary + (bonuses || 0) - (deductions || 0);

    const payroll = await Payroll.create({
        employeeId,
        month,
        year,
        baseSalary,
        deductions,
        bonuses,
        netSalary,
        status: status || 'Pending',
        paymentDate: status === 'Paid' ? new Date() : null,
    });

    res.status(201).json(payroll);
};

// @desc    Update payroll status (Admin)
// @route   PUT /api/payroll/:id
// @access  Private/Admin
const updatePayrollStatus = async (req, res) => {
    const { status } = req.body;

    const payroll = await Payroll.findById(req.params.id);

    if (payroll) {
        payroll.status = status;
        if (status === 'Paid') {
            payroll.paymentDate = new Date();
        }
        const updatedPayroll = await payroll.save();
        res.json(updatedPayroll);
    } else {
        res.status(404);
        throw new Error('Payroll record not found');
    }
}

export { getMyPayroll, getAllPayroll, createPayrollRecord, updatePayrollStatus };
