import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
