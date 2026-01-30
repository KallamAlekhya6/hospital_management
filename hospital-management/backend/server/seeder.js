import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Admin user already exists!');
            process.exit();
        }

        const adminUser = {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // Will be hashed by pre-save middleware
            role: 'admin',
            phone: '1234567890',
            gender: 'Male'
        };

        await User.create(adminUser);

        console.log('Admin user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
