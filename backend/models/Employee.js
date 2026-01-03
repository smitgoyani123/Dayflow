import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    employeeCode: {
        type: String,
        unique: true,
        sparse: true, // Allows null/undefined to not conflict, basically unique if exists
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    profilePicture: {
        type: String, // URL or base64 string
        default: '',
    },
    leaveBalance: {
        type: Map,
        of: Number,
        default: {
            'Paid Time Off (PTO)': 15,
            'Sick Leave': 10,
            'Casual Leave': 5,
            'Unpaid Leave': 0
        }
    },
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
