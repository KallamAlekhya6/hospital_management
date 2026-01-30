import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Calendar, Clock, User, Stethoscope, ChevronLeft } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const BookAppointment = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form State
    const [department, setDepartment] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Data from API
    const [departments, setDepartments] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptsRes, docsRes] = await Promise.all([
                    api.get('/users/departments'),
                    api.get('/users/doctors')
                ]);
                setDepartments(deptsRes.data);
                setAllDoctors(docsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load departments or doctors');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (department) {
            const filtered = allDoctors.filter(doc => doc.specialization === department);
            setFilteredDoctors(filtered);
        } else {
            setFilteredDoctors([]);
        }
    }, [department, allDoctors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post('/appointments', {
                doctorId,
                date,
                time,
                reason
            });

            toast.success('Appointment booked successfully!');
            navigate('/patient-dashboard');
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary/5 p-8 border-b border-slate-100">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-sm text-slate-500 hover:text-primary mb-4 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-dark">Book an Appointment</h1>
                    <p className="text-slate-500 mt-2">Fill out the form below to schedule a visit.</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Department Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Stethoscope className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    required
                                    value={department}
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                        setDoctorId(''); // Reset doctor when dept changes
                                    }}
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm appearance-none bg-white"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept._id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    required
                                    value={doctorId}
                                    onChange={(e) => setDoctorId(e.target.value)}
                                    disabled={!department}
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm appearance-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
                                >
                                    <option value="">Select Doctor</option>
                                    {filteredDoctors.map((doc) => (
                                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="time"
                                        required
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
                            <textarea
                                rows={4}
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                                placeholder="Briefly describe your symptoms or reason for appointment..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
