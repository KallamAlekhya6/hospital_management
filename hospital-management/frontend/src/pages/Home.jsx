import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Stethoscope, Calendar, Users, Activity, ArrowRight } from 'lucide-react';
import hospitalBg from '../assets/hospital-bg.jpg';
import doctorImg from '../assets/doctor.jpg';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCtaClick = () => {
        if (user) {
            navigate(user.role === 'patient' ? '/patient-dashboard' : '/');
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={hospitalBg}
                        alt="Hospital Building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Your Health, <br />
                        <span className="text-primary">Our Priority.</span>
                    </h1>
                    <p className="text-xl text-slate-200 mb-8 max-w-2xl">
                        Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. Book your appointment today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleCtaClick}
                            className="bg-primary hover:bg-sky-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                        >
                            Book Appointment
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link
                            to="/services"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/30 flex items-center justify-center"
                        >
                            Our Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-2xl flex items-start space-x-4 hover:shadow-lg transition-shadow border border-slate-100">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Stethoscope className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-dark mb-2">Expert Doctors</h3>
                                <p className="text-slate-600">Qualified and experienced medical professionals from top institutions.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl flex items-start space-x-4 hover:shadow-lg transition-shadow border border-slate-100">
                            <div className="p-3 bg-secondary/10 rounded-xl">
                                <Calendar className="w-8 h-8 text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-dark mb-2">Online Booking</h3>
                                <p className="text-slate-600">Easy and quick appointment booking system available 24/7.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl flex items-start space-x-4 hover:shadow-lg transition-shadow border border-slate-100">
                            <div className="p-3 bg-indigo-100 rounded-xl">
                                <Activity className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-dark mb-2">Emergency Care</h3>
                                <p className="text-slate-600">Round-the-clock emergency services for critical situations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-2xl rotate-3"></div>
                            <img
                                src={doctorImg}
                                alt="Professional Doctor"
                                className="relative rounded-2xl shadow-xl w-full object-cover h-[500px]"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Leading the Way in Medical Excellence</h2>
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                At HopeMedical, we believe in a patient-first approach. Our dedicated team works tirelessly to provide comprehensive medical care tailored to your unique needs. From preventive checkups to complex surgeries, we are here for you.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'State-of-the-art diagnostic equipment',
                                    'Comprehensive specialist care',
                                    'Patient-centered treatment plans',
                                    'Comfortable and modern facilities'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-slate-700">
                                        <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="text-primary font-semibold hover:underline flex items-center">
                                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Internal Helper for list
function CheckCircle({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
}

export default Home;
