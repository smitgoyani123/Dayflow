import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import Employee from '../models/Employee.js';

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
            employeeId: user.employeeId,
            employeeDetails: employee,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Register a new user (Admin/HR only usually, but open for now as per req "Create Organization")
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role, fullName, companyName, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        email,
        password,
        role: role || 'Employee',
    });

    if (user) {
        // Parse Name
        let firstName = 'New';
        let lastName = 'User';
        if (fullName) {
            const parts = fullName.split(' ');
            firstName = parts[0];
            lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
        }

        // Generate a random Employee Code (Simple Logic: EMP + Random 4 Digits)
        // In a real app, this should be sequential or checked for uniqueness.
        const empCode = 'EMP' + Math.floor(1000 + Math.random() * 9000);

        // Create detailed Employee profile linked to User
        const newEmployee = await Employee.create({
            userId: user._id,
            email: user.email,
            firstName: firstName,
            lastName: lastName || (role === 'Admin' ? 'Admin' : 'Employee'),
            designation: role === 'Admin' ? 'Administrator' : 'Staff',
            department: companyName || 'General', // Using Company Name as Department/Org identifier for now
            dateOfJoining: new Date(),
            salary: 0,
            address: 'Please update address',
            phoneNumber: phone || '0000000000',
            employeeCode: empCode, // Save the generated code
            profilePicture: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
        });

        user.employeeId = newEmployee._id;
        await user.save();

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            employeeId: user.employeeId,
            employeeCode: empCode,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export { loginUser, registerUser };
