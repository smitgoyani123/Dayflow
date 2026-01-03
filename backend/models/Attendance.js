import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-day', 'Leave'],
        default: 'Absent',
    },
    totalHours: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Ensure one attendance record per employee per day is preferred, but simple indexing for queries:
attendanceSchema.index({ employeeId: 1, date: 1 });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
