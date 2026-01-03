import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    firstName: {
        type: String,
        required: true,
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
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
