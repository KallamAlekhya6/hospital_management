import User from '../models/User.js';
import DoctorProfile from '../models/DoctorProfile.js';
import Appointment from '../models/Appointment.js';
import Department from '../models/Department.js';

// @desc    Get Admin Stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
    const doctorsCount = await User.countDocuments({ role: 'doctor' });
    const patientsCount = await User.countDocuments({ role: 'patient' });
    const appointmentsCount = await Appointment.countDocuments();

    res.json({
        doctors: doctorsCount,
        patients: patientsCount,
        appointments: appointmentsCount,
    });
};

// @desc    Get All Doctors
// @route   GET /api/admin/doctors
// @access  Private (Admin)
const getAllDoctors = async (req, res) => {
    // Join with DoctorProfile to get specialization etc if needed
    // For simplicity, just fetching users with role doctor and maybe populate profile if we link them back
    // A better way is to fetch DoctorProfiles and populate user
    const doctors = await DoctorProfile.find().populate('user', '-password');
    res.json(doctors);
};

// @desc    Add New Doctor
// @route   POST /api/admin/doctors
// @access  Private (Admin)
const addDoctor = async (req, res) => {
    const { name, email, password, phone, gender, specialization, qualification, experience, feesPerConsultation, availability } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'doctor',
        phone,
        gender,
        isActive: true
    });

    if (user) {
        await DoctorProfile.create({
            user: user._id,
            specialization,
            qualification,
            experience,
            feesPerConsultation,
            availability
        });

        res.status(201).json({ message: 'Doctor created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get All Patients
// @route   GET /api/admin/patients
// @access  Private (Admin)
const getAllPatients = async (req, res) => {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
};

// @desc    Toggle User Status (Block/Activate)
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
const toggleUserStatus = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isActive = !user.isActive;
        await user.save();
        res.json({ message: `User ${user.isActive ? 'activated' : 'blocked'}` });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get All Appointments
// @route   GET /api/admin/appointments
// @access  Private (Admin)
const getAllAppointments = async (req, res) => {
    const appointments = await Appointment.find()
        .populate('doctor', 'name')
        .populate('patient', 'name')
        .sort({ date: -1 });
    res.json(appointments);
};

// @desc    Manage Department
// @route   POST /api/admin/departments
// @access  Private (Admin)
const addDepartment = async (req, res) => {
    const { name, description } = req.body;
    try {
        const dept = await Department.create({ name, description });
        res.status(201).json(dept);
    } catch (error) {
        res.status(400).json({ message: 'Department already exists' });
    }
};

const getDepartments = async (req, res) => {
    const depts = await Department.find();
    res.json(depts);
};

const deleteDepartment = async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department removed' });
};

export {
    getStats,
    getAllDoctors,
    addDoctor,
    getAllPatients,
    toggleUserStatus,
    getAllAppointments,
    addDepartment,
    getDepartments,
    deleteDepartment
};
