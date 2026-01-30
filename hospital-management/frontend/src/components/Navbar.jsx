import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Activity className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-dark">HopeMedical</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 hover:text-primary transition-colors font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={
                                        user.role === 'admin'
                                            ? '/admin-dashboard'
                                            : user.role === 'doctor'
                                                ? '/doctor-dashboard'
                                                : '/patient-dashboard'
                                    }
                                    className="text-dark font-medium hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-primary font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-md bg-primary text-white hover:bg-sky-600 transition-colors shadow-sm"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link
                                    to={
                                        user.role === 'admin'
                                            ? '/admin-dashboard'
                                            : user.role === 'doctor'
                                                ? '/doctor-dashboard'
                                                : '/patient-dashboard'
                                    }
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-sky-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
