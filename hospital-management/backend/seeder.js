import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Department from './models/Department.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data (optional, but good for clean seed)
        // await User.deleteMany();
        // await Department.deleteMany();

        // 1. Create Admin
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                phone: '1234567890',
                gender: 'Male'
            });
            console.log('Admin created: admin@example.com / admin123');
        }

        // 2. Create Departments
        const deptsCount = await Department.countDocuments();
        if (deptsCount === 0) {
            const defaultDepts = [
                { name: 'Cardiology', description: 'Heart and blood vessel specialist' },
                { name: 'Neurology', description: 'Brain and nervous system specialist' },
                { name: 'Pediatrics', description: 'Child and adolescent medical care' },
                { name: 'Dermatology', description: 'Skin, hair and nail specialist' },
                { name: 'Orthopedics', description: 'Bone and muscle specialist' },
                { name: 'Oncology', description: 'Cancer specialist' },
                { name: 'Radiology', description: 'Imaging specialist' },
                { name: 'Psychiatry', description: 'Mental health specialist' },
                { name: 'Gynecology', description: 'Female reproductive system specialist' },
                { name: 'Ophthalmology', description: 'Eye specialist' },
                { name: 'ENT Specialist', description: 'Ear, Nose, and Throat specialist' },
                { name: 'General Medicine', description: 'General health and diagnosis' },
                { name: 'Urology', description: 'Urinary tract specialist' },
                { name: 'Gastroenterology', description: 'Digestive system specialist' },
                { name: 'Endocrinology', description: 'Hormone and metabolism specialist' },
                { name: 'Nephrology', description: 'Kidney specialist' },
                { name: 'Pulmonology', description: 'Lung and respiratory specialist' }
            ];
            await Department.insertMany(defaultDepts);
            console.log('Default departments seeded');
        }

        // 3. Create Sample Doctor
        const doctorExists = await User.findOne({ email: 'doctor@example.com' });
        if (!doctorExists) {
            const doctor = await User.create({
                name: 'Dr. John Doe',
                email: 'doctor@example.com',
                password: 'doctor123',
                role: 'doctor',
                phone: '0987654321',
                gender: 'Male',
                isActive: true
            });

            // Create profile
            const DoctorProfile = (await import('./models/DoctorProfile.js')).default;
            await DoctorProfile.create({
                user: doctor._id,
                specialization: 'Cardiology',
                qualification: 'MBBS, MD',
                experience: 10,
                feesPerConsultation: 500,
                availability: [
                    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '17:00' }
                ],
                about: 'Experienced cardiologist with over 10 years of practice.'
            });

            console.log('Sample Doctor created: doctor@example.com / doctor123');
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
