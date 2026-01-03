import mongoose from 'mongoose';

const leaveSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaveType: {
        type: String,
        enum: ['Paid Time Off (PTO)', 'Sick Leave', 'Casual Leave', 'Unpaid Leave'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    adminComment: {
        type: String,
    },
}, {
    timestamps: true,
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
