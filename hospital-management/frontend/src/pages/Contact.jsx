import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-dark mb-4">Contact Us</h1>
                    <p className="text-xl text-slate-600">
                        We are here to help. Reach out to us for any queries or assistance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-dark mb-1">Phone Number</h3>
                                <p className="text-slate-600">+1 (555) 123-4567</p>
                                <p className="text-slate-600">+1 (555) 987-6543</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                            <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-dark mb-1">Email Address</h3>
                                <p className="text-slate-600">info@hopemedical.com</p>
                                <p className="text-slate-600">support@hopemedical.com</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
                            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-dark mb-1">Location</h3>
                                <p className="text-slate-600">
                                    123 Medical Center Drive,<br />
                                    Healthcare City, HC 90210
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                    <input type="text" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                    <input type="text" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input type="email" className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm" placeholder="you@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows={5} className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm" placeholder="How can we help you?"></textarea>
                            </div>

                            <button className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
