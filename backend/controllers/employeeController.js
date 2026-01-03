import asyncHandler from 'express-async-handler';
import Employee from '../models/Employee.js';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/employees/profile
// @access  Private
const getEmployeeProfile = asyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (employee) {
        res.json(employee);
    } else {
        res.status(404);
        throw new Error('Employee profile not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/employees/profile
// @access  Private
const updateEmployeeProfile = asyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (employee) {
        employee.address = req.body.address || employee.address;
        employee.phoneNumber = req.body.phoneNumber || employee.phoneNumber;
        employee.profilePicture = req.body.profilePicture || employee.profilePicture;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } else {
        res.status(404);
        throw new Error('Employee profile not found');
    }
});

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find({});
    res.json(employees);
});

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        designation,
        department,
        dateOfJoining,
        salary,
        address,
        phoneNumber,
    } = req.body;

    // Check if user account exists for this email
    let user = await User.findOne({ email });

    // if (!user) {
    //    // Allow creating employee without user account for now
    // }

    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
        res.status(400);
        throw new Error('Employee profile already exists');
    }

    const employee = new Employee({
        userId: user ? user._id : undefined, // Safe access
        firstName,
        lastName,
        email,
        designation,
        department,
        dateOfJoining,
        salary,
        address,
        phoneNumber,
    });

    const createdEmployee = await employee.save();



    // Link employee to user if user exists
    if (user) {
        user.employeeId = createdEmployee._id;
        await user.save();
    } else {
        // Optionally create a dummy user or just leave unlinked until they sign up
    }

    res.status(201).json(createdEmployee);
});

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private/Admin
const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        res.json(employee);
    } else {
        res.status(404);
        throw new Error('Employee not found');
    }
});

// @desc    Update employee by ID (Admin)
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        employee.firstName = req.body.firstName || employee.firstName;
        employee.lastName = req.body.lastName || employee.lastName;
        employee.designation = req.body.designation || employee.designation;
        employee.department = req.body.department || employee.department;
        employee.salary = req.body.salary || employee.salary;
        employee.address = req.body.address || employee.address;
        employee.phoneNumber = req.body.phoneNumber || employee.phoneNumber;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } else {
        res.status(404);
        throw new Error('Employee not found');
    }
});

export {
    getEmployeeProfile,
    updateEmployeeProfile,
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
};
