import mongoose from 'mongoose';

const doctorProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: Number, // Years of experience
        required: true,
    },
    feesPerConsultation: {
        type: Number,
        required: true,
    },
    availability: [{
        day: {
            type: String, // e.g., "Monday"
            required: true
        },
        startTime: {
            type: String, // e.g., "09:00"
            required: true
        },
        endTime: {
            type: String, // e.g., "17:00"
            required: true
        }
    }],
    about: {
        type: String,
    },
}, {
    timestamps: true,
});

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

export default DoctorProfile;
