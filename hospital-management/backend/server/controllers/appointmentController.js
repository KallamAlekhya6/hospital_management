import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const createAppointment = async (req, res) => {
    const { doctorId, date, reason } = req.body;

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        res.status(404).json({ message: 'Doctor not found' });
        return;
    }

    const appointment = await Appointment.create({
        patient: req.user._id,
        doctor: doctorId,
        date,
        reason,
        status: 'pending'
    });

    res.status(201).json(appointment);
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/my
// @access  Private
const getMyAppointments = async (req, res) => {
    const appointments = await Appointment.find({ patient: req.user._id })
        .populate('doctor', 'name email')
        .sort({ date: -1 });

    res.json(appointments);
};

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
const getDoctorAppointments = async (req, res) => {
    const appointments = await Appointment.find({ doctor: req.user._id })
        .populate('patient', 'name email phone gender')
        .sort({ date: 1 });

    res.json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin/Doctor)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
};

export { createAppointment, getMyAppointments, getDoctorAppointments, updateAppointmentStatus };
