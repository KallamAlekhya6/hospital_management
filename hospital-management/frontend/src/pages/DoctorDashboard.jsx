import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AppointmentCard from '../components/AppointmentCard';
import { Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const DoctorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/appointments/doctor');
            setAppointments(res.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to load appointments');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}/status`, { status });
            toast.success(`Appointment ${status}`);
            fetchAppointments();
        } catch (error) {
            toast.error(`Failed to update status`);
        }
    };

    // Stats
    const totalPatients = new Set(appointments.map(a => a.patient)).size;
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today).length;
    const pendingRequests = appointments.filter(a => a.status === 'pending').length;

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-dark">Doctor Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Dr. {user?.name}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                        <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Unique Patients</p>
                            <h3 className="text-2xl font-bold text-dark">{totalPatients}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                        <div className="p-4 bg-emerald-50 rounded-full text-emerald-600">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Appointments Today</p>
                            <h3 className="text-2xl font-bold text-dark">{todayAppointments}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                        <div className="p-4 bg-amber-50 rounded-full text-amber-600">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending Approvals</p>
                            <h3 className="text-2xl font-bold text-dark">{pendingRequests}</h3>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8">
                    {/* Pending Requests */}
                    <div>
                        <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-amber-500" />
                            Pending Appointments
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appointments.filter(a => a.status === 'pending').length > 0 ? (
                                appointments.filter(a => a.status === 'pending').map(appt => (
                                    <AppointmentCard
                                        key={appt._id}
                                        appointment={{
                                            ...appt,
                                            status: 'Pending'
                                        }}
                                        isDoctorMode={true}
                                        onApprove={() => updateStatus(appt._id, 'approved')}
                                        onReject={() => updateStatus(appt._id, 'rejected')}
                                    />
                                ))
                            ) : (
                                <p className="text-slate-500 col-span-full py-8 text-center bg-white rounded-xl border border-dashed border-slate-200">No pending appointment requests.</p>
                            )}
                        </div>
                    </div>

                    {/* Approved Appointments */}
                    <div>
                        <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                            Approved Appointments
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appointments.filter(a => a.status === 'approved').length > 0 ? (
                                appointments.filter(a => a.status === 'approved').map(appt => (
                                    <AppointmentCard
                                        key={appt._id}
                                        appointment={{
                                            ...appt,
                                            status: 'Approved'
                                        }}
                                        isDoctorMode={true}
                                        onApprove={() => updateStatus(appt._id, 'approved')}
                                        onReject={() => updateStatus(appt._id, 'rejected')}
                                        onComplete={() => updateStatus(appt._id, 'completed')}
                                    />
                                ))
                            ) : (
                                <p className="text-slate-500 col-span-full py-8 text-center bg-white rounded-xl border border-dashed border-slate-200">No approved appointments.</p>
                            )}
                        </div>
                    </div>

                    {/* Completed Appointments - History */}
                    <div>
                        <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
                            Completed History
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appointments.filter(a => a.status === 'completed').length > 0 ? (
                                appointments.filter(a => a.status === 'completed').map(appt => (
                                    <AppointmentCard
                                        key={appt._id}
                                        appointment={{
                                            ...appt,
                                            status: 'Completed' // Use 'Completed' to show generic color or update card to handle it
                                        }}
                                        isDoctorMode={true}
                                    // No actions for completed
                                    />
                                ))
                            ) : (
                                <p className="text-slate-500 col-span-full py-8 text-center bg-white rounded-xl border border-dashed border-slate-200">No completed appointments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
