// import User from '../models/User.js';

// // @desc    Get all doctors
// // @route   GET /api/users/doctors
// // @access  Private
// const getAllDoctors = async (req, res) => {
//     const doctors = await User.find({ role: 'doctor' }).select('-password');
//     res.json(doctors);
// };

// export { getAllDoctors };

import User from '../models/User.js';
import DoctorProfile from '../models/DoctorProfile.js';
import Department from '../models/Department.js';

// @desc    Get all doctors
// @route   GET /api/users/doctors
// @access  Private
const getAllDoctors = async (req, res) => {
    const profiles = await DoctorProfile.find().populate('user', 'name');

    const doctors = profiles
        .filter(profile => profile.user)
        .map(profile => ({
            _id: profile.user._id,
            name: profile.user.name,
            specialization: profile.specialization
        }));

    res.json(doctors);
};

// @desc    Get all departments
// @route   GET /api/users/departments
// @access  Private
const getDepartments = async (req, res) => {
    let depts = await Department.find();

    // Auto-seed if empty for consistency
    if (depts.length === 0) {
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
        depts = await Department.find();
    }

    res.json(depts);
};

export { getAllDoctors, getDepartments };

