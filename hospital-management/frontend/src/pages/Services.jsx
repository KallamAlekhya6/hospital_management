import React from 'react';
import { Heart, Activity, Brain, Bone, Baby, Eye, Stethoscope, Microscope } from 'lucide-react';

const Services = () => {
    const services = [
        { title: 'Cardiology', icon: <Heart className="w-10 h-10 text-rose-500" />, desc: 'Comprehensive heart care including diagnostics, surgery, and rehabilitation.' },
        { title: 'Neurology', icon: <Brain className="w-10 h-10 text-purple-500" />, desc: 'Advanced treatment for disorders of the nervous system and brain.' },
        { title: 'Orthopedics', icon: <Bone className="w-10 h-10 text-slate-500" />, desc: 'Specialized care for bones, joints, ligaments, tendons, and muscles.' },
        { title: 'Pediatrics', icon: <Baby className="w-10 h-10 text-sky-500" />, desc: 'Compassionate care for infants, children, and adolescents.' },
        { title: 'Ophthalmology', icon: <Eye className="w-10 h-10 text-blue-500" />, desc: 'Complete eye care services from routine exams to complex surgeries.' },
        { title: 'General Medicine', icon: <Stethoscope className="w-10 h-10 text-emerald-500" />, desc: 'Primary care services for all your general health needs.' },
        { title: 'Laboratory', icon: <Microscope className="w-10 h-10 text-indigo-500" />, desc: '24/7 advanced pathology and diagnostic laboratory services.' },
        { title: 'Emergency', icon: <Activity className="w-10 h-10 text-red-500" />, desc: 'Round-the-clock emergency care for critical medical situations.' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-dark mb-4">Medical Services</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We offer a wide range of specialized medical services to ensure you receive the best possible care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl w-fit">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
