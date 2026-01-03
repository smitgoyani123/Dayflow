import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './backend/models/Employee.js';

dotenv.config({ path: './backend/.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Find the most recent employee
        const emp = await Employee.findOne().sort({ createdAt: -1 });

        if (emp) {
            console.log('Most Recent Employee Found:');
            console.log('Name:', emp.firstName, emp.lastName);
            console.log('Has companyLogo?', !!emp.companyLogo);
            if (emp.companyLogo) {
                console.log('Logo Length:', emp.companyLogo.length);
                console.log('Logo Start:', emp.companyLogo.substring(0, 50));
            } else {
                console.log('Logo Field is Empty or Missing');
            }
        } else {
            console.log('No employees found.');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
