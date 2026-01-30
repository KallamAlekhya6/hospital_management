import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error('--- AUTH ERROR ---');
            console.error('Type:', error.name); // TokenExpiredError, JsonWebTokenError
            console.error('Message:', error.message);
            console.error('Token found in headers:', token ? 'Yes (starts with ' + token.substring(0, 10) + '...)' : 'No');
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const doctor = (req, res, next) => {
    if (req.user && req.user.role === 'doctor') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a doctor' });
    }
};

export { protect, admin, doctor };
