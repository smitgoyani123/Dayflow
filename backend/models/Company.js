import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    logo: {
        type: String, // URL or base64
        default: '',
    },
    code: {
        type: String,
        unique: true,
        uppercase: true,
        trim: true,
    },
    adminUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    settings: {
        timezone: {
            type: String,
            default: 'UTC',
        },
        currency: {
            type: String,
            default: 'USD',
        },
    },
}, {
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;


