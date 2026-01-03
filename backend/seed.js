import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Employee from './models/Employee.js';
import Attendance from './models/Attendance.js';
import Leave from './models/Leave.js';
import Payroll from './models/Payroll.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Employee.deleteMany();
        await Attendance.deleteMany();
        await Leave.deleteMany();
        await Payroll.deleteMany();

        console.log('Data Destroyed!');

        // 1. Create Admin User & Employee Profile
        const adminUser = await User.create({
            email: 'admin@dayflow.com',
            password: 'password123',
            role: 'Admin',
        });

        const adminEmployee = await Employee.create({
            userId: adminUser._id,
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@dayflow.com',
            designation: 'HR Manager',
            department: 'Human Resources',
            dateOfJoining: new Date('2025-01-01'),
            salary: 100000,
            address: '123 Admin St, City',
            phoneNumber: '1234567890',
            profilePicture: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
        });

        adminUser.employeeId = adminEmployee._id;
        await adminUser.save();

        // 2. Create Regular Employee & User
        const employeeUser = await User.create({
            email: 'employee@dayflow.com',
            password: 'password123',
            role: 'Employee',
        });

        const employeeProfile = await Employee.create({
            userId: employeeUser._id,
            firstName: 'John',
            lastName: 'Doe',
            email: 'employee@dayflow.com',
            designation: 'Software Engineer',
            department: 'Engineering',
            dateOfJoining: new Date('2025-02-15'),
            salary: 80000,
            address: '456 Dev Lane, Tech Park',
            phoneNumber: '0987654321',
            profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        });

        employeeUser.employeeId = employeeProfile._id;
        await employeeUser.save();

        // 3. Create Dummy Attendance for Employee
        await Attendance.create({
            employeeId: employeeProfile._id,
            date: new Date(),
            checkIn: new Date(new Date().setHours(9, 0, 0)),
            checkOut: new Date(new Date().setHours(17, 0, 0)),
            status: 'Present',
            totalHours: 8,
        });

        // 4. Create Dummy Leave Request
        await Leave.create({
            employeeId: employeeProfile._id,
            leaveType: 'Sick Leave',
            startDate: new Date(),
            endDate: new Date(),
            reason: 'Not feeling well',
            status: 'Pending',
        });

        console.log('Data Imported!');
        console.log('-----------------------------------');
        console.log('Admin Credentials:');
        console.log('Email: admin@dayflow.com');
        console.log('Password: password123');
        console.log('-----------------------------------');
        console.log('Employee Credentials:');
        console.log('Email: employee@dayflow.com');
        console.log('Password: password123');
        console.log('-----------------------------------');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData();
} else {
    importData();
}
