import mongoose from 'mongoose';

const payrollSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    month: {
        type: String, // e.g., "January"
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    baseSalary: {
        type: Number,
        required: true,
    },
    deductions: {
        type: Number,
        default: 0,
    },
    bonuses: {
        type: Number,
        default: 0,
    },
    netSalary: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
    },
    paymentDate: {
        type: Date,
    }
}, {
    timestamps: true,
});

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;
