import React from 'react';
import doctorImg from '../assets/doctor.jpg';

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mission & Vision */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-dark mb-4">About HopeMedical</h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Trusted by thousands of families, we are dedicated to providing compassionate, patient-centered care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To improve the health and well-being of the communities we serve by providing accessible, high-quality, and compassionate healthcare. We strive to be the healthcare provider of choice, known for clinical excellence and a patient-first approach.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To act as a beacon of hope and healing, setting the standard for medical excellence and innovation. We envision a future where everyone has access to world-class healthcare, regardless of their background or circumstances.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team / Story */}
                <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="lg:w-1/2 p-12">
                        <h2 className="text-3xl font-bold text-dark mb-6">Our Journey</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Founded in 2010, HopeMedical started as a small clinic with a big dream. Over the last decade, we have grown into a multi-specialty hospital with state-of-the-art facilities and a team of over 100 specialized doctors.
                        </p>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Our success is built on the trust of our patients and the dedication of our staff. We continue to invest in the latest medical technology and training to ensure that we deliver the best outcomes for our patients.
                        </p>
                    </div>
                    <div className="lg:w-1/2 h-[400px] lg:h-[500px]">
                        <img
                            src={doctorImg}
                            alt="Medical Team"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
