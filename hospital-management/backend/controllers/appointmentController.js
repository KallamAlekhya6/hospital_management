import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import DoctorProfile from '../models/DoctorProfile.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const createAppointment = async (req, res) => {
    const { doctorId, date, time, reason } = req.body;

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        res.status(404).json({ message: 'Doctor not found' });
        return;
    }

    const appointment = await Appointment.create({
        patient: req.user._id,
        doctor: doctorId,
        date,
        time,
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
        .populate({
            path: 'doctor',
            select: 'name email'
        })
        .sort({ date: -1 });

    // Since we need specialization from DoctorProfile, we can either populate it or fetch it separately
    // For simplicity, let's just send what we have and maybe fetch specialization in frontend or do it here
    const appointmentData = await Promise.all(appointments.map(async (appt) => {
        const profile = await DoctorProfile.findOne({ user: appt.doctor._id });
        return {
            ...appt._doc,
            doctorName: appt.doctor.name,
            department: profile ? profile.specialization : 'N/A'
        };
    }));

    res.json(appointmentData);
};

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
const getDoctorAppointments = async (req, res) => {
    const appointments = await Appointment.find({ doctor: req.user._id })
        .populate('patient', 'name email phone gender')
        .sort({ date: 1 });

    const appointmentData = appointments.map(appt => ({
        ...appt._doc,
        patientName: appt.patient.name,
    }));

    res.json(appointmentData);
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
