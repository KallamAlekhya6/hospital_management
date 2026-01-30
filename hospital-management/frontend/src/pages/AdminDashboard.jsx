import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, UserPlus, Activity, Calendar, X, Plus, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [showAddDept, setShowAddDept] = useState(false);
    const [activeTab, setActiveTab] = useState('doctors'); // doctors, patients, appointments

    // New Doctor Form State
    const [newDoc, setNewDoc] = useState({
        name: '', email: '', password: '', phone: '', gender: 'Male',
        specialization: '', qualification: '', experience: '', feesPerConsultation: '',
    });
    const [isManualDept, setIsManualDept] = useState(false);

    // New Department State
    const [newDept, setNewDept] = useState({ name: '', description: '' });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [statsRes, docsRes, patientsRes, apptsRes, deptsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/doctors'),
                api.get('/admin/patients'),
                api.get('/admin/appointments'),
                api.get('/admin/departments')
            ]);
            setStats(statsRes.data);
            setDoctors(docsRes.data);
            setPatients(patientsRes.data);
            setAppointments(apptsRes.data);
            setDepartments(deptsRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/doctors', {
                ...newDoc,
                availability: [
                    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '17:00' },
                ]
            });
            toast.success('Doctor added successfully');
            setShowAddDoctor(false);
            setNewDoc({
                name: '', email: '', password: '', phone: '', gender: 'Male',
                specialization: '', qualification: '', experience: '', feesPerConsultation: '',
            });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add doctor');
        }
    };

    const handleAddDept = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/departments', newDept);
            toast.success('Department added');
            setShowAddDept(false);
            setNewDept({ name: '', description: '' });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add department');
        }
    };

    const handleDeleteDept = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await api.delete(`/admin/departments/${id}`);
                toast.success('Department deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete department');
            }
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.put(`/admin/users/${id}/status`);
            toast.success('Status updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const updateAppointmentStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}/status`, { status });
            toast.success(`Appointment ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update appointment');
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col sm:row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Hospital Management System</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAddDept(true)}
                            className="bg-white border border-slate-200 text-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Manage Depts
                        </button>
                        <button
                            onClick={() => setShowAddDoctor(true)}
                            className="bg-primary hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-md shadow-primary/20"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add New Doctor
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { title: 'Total Patients', value: stats.patients, icon: <Users className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-50' },
                        { title: 'Total Doctors', value: stats.doctors, icon: <UserPlus className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-50' },
                        { title: 'Total Appointments', value: stats.appointments, icon: <Calendar className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
                            <div className={`p-4 ${stat.bg} rounded-full`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-dark">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100 mb-6 w-fit">
                    {['doctors', 'patients', 'appointments'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-slate-100 text-dark'
                                    : 'text-slate-500 hover:text-dark hover:bg-slate-50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-dark text-lg">
                            {activeTab === 'doctors' && 'Doctors Directory'}
                            {activeTab === 'patients' && 'Patients Directory'}
                            {activeTab === 'appointments' && 'All Appointments'}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {activeTab === 'doctors' && `${doctors.length} Registered`}
                            {activeTab === 'patients' && `${patients.length} Registered`}
                            {activeTab === 'appointments' && `${appointments.length} Total`}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        {/* Doctors Table */}
                        {activeTab === 'doctors' && (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-slate-500 uppercase border-b border-slate-100 bg-slate-50/30">
                                        <th className="px-6 py-4 font-semibold">Doctor Details</th>
                                        <th className="px-6 py-4 font-semibold">Specialization</th>
                                        <th className="px-6 py-4 font-semibold">Experience</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                                    {doctors.map((doc) => (
                                        <tr key={doc._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-dark">Dr. {doc.user?.name}</span>
                                                    <span className="text-xs text-slate-400">{doc.user?.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                                                    {doc.specialization}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{doc.experience} Years</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${doc.user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {doc.user?.isActive ? 'Active' : 'Blocked'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStatus(doc.user?._id)}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${doc.user?.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                                >
                                                    {doc.user?.isActive ? 'Block' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {doctors.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                                No doctors found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                        {/* Patients Table */}
                        {activeTab === 'patients' && (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-slate-500 uppercase border-b border-slate-100 bg-slate-50/30">
                                        <th className="px-6 py-4 font-semibold">Patient Name</th>
                                        <th className="px-6 py-4 font-semibold">Contact</th>
                                        <th className="px-6 py-4 font-semibold">Gender</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                                    {patients.map((pat) => (
                                        <tr key={pat._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-dark">{pat.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span>{pat.email}</span>
                                                    <span className="text-xs text-slate-400">{pat.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{pat.gender}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${pat.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {pat.isActive ? 'Active' : 'Blocked'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStatus(pat._id)}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${pat.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                                >
                                                    {pat.isActive ? 'Block' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {patients.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                                No patients found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                        {/* Appointments Table */}
                        {activeTab === 'appointments' && (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-slate-500 uppercase border-b border-slate-100 bg-slate-50/30">
                                        <th className="px-6 py-4 font-semibold">Patient</th>
                                        <th className="px-6 py-4 font-semibold">Doctor</th>
                                        <th className="px-6 py-4 font-semibold">Date & Time</th>
                                        <th className="px-6 py-4 font-semibold">Reason</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                                    {appointments.map((appt) => (
                                        <tr key={appt._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-dark">{appt.patient?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4">Dr. {appt.doctor?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{appt.date}</span>
                                                    <span className="text-xs text-slate-400">{appt.time}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate" title={appt.reason}>{appt.reason}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize
                                                    ${appt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            appt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    {appt.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateAppointmentStatus(appt._id, 'approved')}
                                                                className="text-xs font-bold px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => updateAppointmentStatus(appt._id, 'cancelled')}
                                                                className="text-xs font-bold px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                    {appt.status === 'approved' && (
                                                        <button
                                                            onClick={() => updateAppointmentStatus(appt._id, 'cancelled')}
                                                            className="text-xs font-bold px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {appointments.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                                                No appointments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Add Doctor Modal */}
                {showAddDoctor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                                <h2 className="text-xl font-bold text-dark">Add New Doctor</h2>
                                <button onClick={() => setShowAddDoctor(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleAddDoctor} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                        <input
                                            type="text" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.name} onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input
                                            type="email" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.email} onChange={(e) => setNewDoc({ ...newDoc, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                        <input
                                            type="password" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.password} onChange={(e) => setNewDoc({ ...newDoc, password: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white font-medium"
                                            value={newDoc.gender}
                                            onChange={(e) => setNewDoc({ ...newDoc, gender: e.target.value })}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-sm font-medium text-slate-700">Department</label>
                                            <label className="text-xs text-primary flex items-center cursor-pointer hover:underline">
                                                <input
                                                    type="checkbox"
                                                    className="mr-1"
                                                    checked={isManualDept}
                                                    onChange={(e) => {
                                                        setIsManualDept(e.target.checked);
                                                        setNewDoc({ ...newDoc, specialization: '' });
                                                    }}
                                                />
                                                Type manually
                                            </label>
                                        </div>
                                        <div className="flex gap-2">
                                            {isManualDept ? (
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Enter department name"
                                                    className="flex-grow px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                                    value={newDoc.specialization}
                                                    onChange={(e) => setNewDoc({ ...newDoc, specialization: e.target.value })}
                                                />
                                            ) : (
                                                <select
                                                    required
                                                    className="flex-grow px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white font-medium"
                                                    value={newDoc.specialization}
                                                    onChange={(e) => setNewDoc({ ...newDoc, specialization: e.target.value })}
                                                >
                                                    <option value="">Select Dept</option>
                                                    {departments.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                                                </select>
                                            )}
                                            {!isManualDept && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddDept(true)}
                                                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                                                    title="Manage Departments"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
                                        <input
                                            type="text" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.qualification} onChange={(e) => setNewDoc({ ...newDoc, qualification: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Experience (Years)</label>
                                        <input
                                            type="number" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.experience} onChange={(e) => setNewDoc({ ...newDoc, experience: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Consultation Fees</label>
                                        <input
                                            type="number" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.feesPerConsultation} onChange={(e) => setNewDoc({ ...newDoc, feesPerConsultation: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                        <input
                                            type="text" required
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            value={newDoc.phone} onChange={(e) => setNewDoc({ ...newDoc, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-sky-600 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Create Doctor Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Manage Departments Modal */}
                {showAddDept && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-xl font-bold text-dark">Departments</h2>
                                <button onClick={() => setShowAddDept(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleAddDept} className="mb-6 space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Add New</h3>
                                    <input
                                        type="text" placeholder="Dept Name (e.g. Cardiology)" required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                        value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-dark text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                                    >
                                        Add Department
                                    </button>
                                </form>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {departments.map((d) => (
                                        <div key={d._id} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg group hover:border-primary/30 transition-colors">
                                            <span className="font-medium text-dark">{d.name}</span>
                                            <button
                                                onClick={() => handleDeleteDept(d._id)}
                                                className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {departments.length === 0 && <p className="text-center text-slate-400 text-sm py-4">No departments yet.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
