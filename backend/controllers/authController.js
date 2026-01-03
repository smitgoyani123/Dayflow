import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import Employee from '../models/Employee.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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
        throw new Error('Invalid email or password');
    }
};

// @desc    Register a new user (Admin/HR only usually, but open for now as per req "Sign Up")
// @route   POST /api/auth/register
// @access  Public (for now)
const registerUser = async (req, res) => {
    const { email, password, role } = req.body;

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
        // Auto-create a basic Employee profile so the user has data
        // For a real app, we might ask for these details in a multi-step form.
        const newEmployee = await Employee.create({
            userId: user._id,
            email: user.email,
            firstName: 'New',
            lastName: role === 'Admin' ? 'Admin' : 'Employee',
            designation: role === 'Admin' ? 'Administrator' : 'Staff',
            department: 'General',
            dateOfJoining: new Date(),
            salary: 0, // Default
            address: 'Please update address',
            phoneNumber: '0000000000',
            profilePicture: `https://ui-avatars.com/api/?name=${role || 'User'}&background=random`
        });

        user.employeeId = newEmployee._id;
        await user.save();

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            employeeId: user.employeeId,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

export { loginUser, registerUser };
