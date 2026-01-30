import React from 'react';
import { Activity, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4 text-white">
                            <Activity className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold">HopeMedical</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            Providing world-class healthcare with compassion and excellence. Your health is our priority.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Cardiology</li>
                            <li>Neurology</li>
                            <li>Pediatrics</li>
                            <li>Orthopedics</li>
                            <li>Surgery</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>123 Medical Center Dr,<br />Healthcare City, HC 90210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>info@hopemedical.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} HopeMedical Center. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
