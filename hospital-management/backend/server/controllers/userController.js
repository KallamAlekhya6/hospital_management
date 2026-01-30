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

export { getAllDoctors };

