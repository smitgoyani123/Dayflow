import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Company from '../models/Company.js';
import generateToken from '../utils/generateToken.js';
import Employee from '../models/Employee.js';
import mongoose from 'mongoose';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let user = null;

    // Check if input is Email or Employee Code
    const isEmail = email.includes('@');

    if (isEmail) {
        user = await User.findOne({ email });
    } else {
        // Assume it's Employee Code
        const employee = await Employee.findOne({ employeeCode: email });
        if (employee) {
            user = await User.findById(employee.userId);
        }
    }

    if (user && (await user.matchPassword(password))) {
        // Fetch employee details if linked
        let employee = null;
        if (user.employeeId) {
            employee = await Employee.findById(user.employeeId);
        }

        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
            employeeId: user.employeeId,
            employeeDetails: employee,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Register a new Organization (HR)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role, fullName, companyName, phone, companyLogo, address } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // 1. Create Company
    const companyCode = companyName.substring(0, 2).toUpperCase(); // Simple logic, maybe better in future

    // Check if company code exists, handle duplicate logic if needed (omit for MVP/Task simplicity or append random)
    // For now, let's assume unique or append random if needed. 
    // Ideally, we'd check availability.

    const company = await Company.create({
        name: companyName,
        email: email, // Company contact email same as HR for now
        phone: phone,
        address: address,
        code: companyCode,
        adminUserId: new mongoose.Types.ObjectId(), // Placeholder, will update after User creation
    });

    if (!company) {
        res.status(400);
        throw new Error('Invalid company data');
    }

    // 2. Create User (HR)
    const user = await User.create({
        email,
        password,
        role: 'HR',
        companyId: company._id,
    });

    if (user) {
        // Update Company Admin
        company.adminUserId = user._id;
        await company.save();

        // 3. Create Employee Profile for HR
        // Parse Name
        let firstName = 'HR';
        let lastName = 'Admin';
        if (fullName) {
            const parts = fullName.split(' ');
            firstName = parts[0];
            lastName = parts.slice(1).join(' ');
        }

        // Generate HR Employee ID
        const empCode = `${companyCode}${firstName.substring(0, 2).toUpperCase()}${lastName.substring(0, 2).toUpperCase()}${new Date().getFullYear()}0001`;

        const newEmployee = await Employee.create({
            userId: user._id,
            companyId: company._id,
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            designation: 'HR Manager',
            department: 'Human Resources',
            dateOfJoining: new Date(),
            salary: 0,
            address: address || 'Please update address',
            phoneNumber: phone || '0000000000',
            employeeCode: empCode, // Save the generated code
            profilePicture: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
            companyLogo: companyLogo || '' // Save Company Logo
        });

        user.employeeId = newEmployee._id;
        await user.save();

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
            employeeId: user.employeeId,
            employeeDetails: newEmployee, // Return full object for consistency with login
            token: generateToken(user._id),
        });
    } else {
        await Company.findByIdAndDelete(company._id); // Rollback
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export { loginUser, registerUser };
