import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new patient
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, phone, gender, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    // FORCE ROLE TO PATIENT IF NOT ADMIN (Security)
    // Or allowed for now? Requirement says Admin adds doctors.
    // So public registration is only for patients.
    const userRole = role === 'admin' ? 'admin' : 'patient';
    // Wait, if I want to create an admin initially I might need a seed script or manual DB edit.
    // For this demo, let's allow passing 'doctor' or 'admin' only if needed, but standard flow is:
    // Public Register -> Patient
    // Admin Dashboard -> Create Doctor

    const user = await User.create({
        name,
        email,
        password,
        role: 'patient', // Force patient
        phone,
        gender
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            gender: user.gender,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export { loginUser, registerUser, getProfile };
