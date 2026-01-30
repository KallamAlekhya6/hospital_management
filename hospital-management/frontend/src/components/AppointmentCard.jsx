import React from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Clock as PendingIcon } from 'lucide-react';

const AppointmentCard = ({ appointment, onCancel, onApprove, onReject, onComplete, isDoctorMode = false }) => {
    const { doctorName, patientName, date, time, status, department } = appointment;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-600 bg-green-50';
            case 'Rejected': return 'text-red-600 bg-red-50';
            case 'Completed': return 'text-blue-600 bg-blue-50';
            default: return 'text-yellow-600 bg-yellow-50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle className="w-4 h-4 mr-1" />;
            case 'Rejected': return <XCircle className="w-4 h-4 mr-1" />;
            case 'Completed': return <CheckCircle className="w-4 h-4 mr-1" />;
            default: return <PendingIcon className="w-4 h-4 mr-1" />;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-dark">
                        {isDoctorMode ? patientName : `Dr. ${doctorName}`}
                    </h3>
                    <p className="text-sm text-slate-500">{department}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    {status}
                </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{time}</span>
                </div>
                {isDoctorMode && (
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        <span>Patient Role</span> {/* Placeholder info */}
                    </div>
                )}
            </div>

            <div className="flex space-x-3">
                {isDoctorMode && status === 'Pending' ? (
                    <>
                        <button
                            onClick={onApprove}
                            className="flex-1 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                            Approve
                        </button>
                        <button
                            onClick={onReject}
                            className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Reject
                        </button>
                    </>
                ) : (
                    !isDoctorMode && status === 'Pending' && (
                        <button
                            onClick={onCancel}
                            className="w-full px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Cancel Appointment
                        </button>
                    )
                )}
                {isDoctorMode && status === 'Approved' && onComplete && (
                    <button
                        onClick={onComplete}
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Mark as Complete
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;
