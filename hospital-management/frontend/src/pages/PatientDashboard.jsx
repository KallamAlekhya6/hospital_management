import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AppointmentCard from '../components/AppointmentCard';
import { PlusCircle, History, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const PatientDashboard = () => {
    const { user } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/appointments/my');
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

    const handleCancel = async (id) => {
        try {
            await api.put(`/appointments/${id}/status`, { status: 'cancelled' });
            toast.success('Appointment cancelled');
            fetchAppointments();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            toast.error('Failed to cancel appointment');
        }
    };

    const filteredAppointments = appointments.filter(appt => {
        if (activeTab === 'upcoming') return appt.status === 'pending' || appt.status === 'approved';
        return appt.status === 'completed' || appt.status === 'cancelled';
    });

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-dark">Hello, {user?.name || 'Patient'}</h1>
                        <p className="text-slate-500 mt-1">Manage your health and appointments</p>
                    </div>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-sky-600 shadow-md transition-all transform hover:scale-105"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Book Appointment
                    </Link>
                </div>

                {/* Stats / Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-dark">My Profile</h3>
                            <p className="text-sm text-slate-500">View personal details</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="p-3 bg-green-50 rounded-full text-green-600">
                            <History className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-dark">Medical History</h3>
                            <p className="text-sm text-slate-500">Check past records</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="border-b border-slate-100">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'upcoming'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                Upcoming Appointments
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'history'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                Appointment History
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : filteredAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAppointments.map(appt => (
                                    <AppointmentCard
                                        key={appt._id}
                                        appointment={{
                                            ...appt,
                                            status: appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
                                        }}
                                        onCancel={() => handleCancel(appt._id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 text-lg mb-4">No appointments found in this category.</p>
                                {activeTab === 'upcoming' && (
                                    <Link to="/book-appointment" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors">
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        Book your first appointment
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
