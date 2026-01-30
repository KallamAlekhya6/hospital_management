import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled', 'completed'],
        default: 'pending',
    },
    reason: {
        type: String,
        required: true,
    },
    prescription: {
        type: String,
    },
    diagnosis: {
        type: String,
    },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
