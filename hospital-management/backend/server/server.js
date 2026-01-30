import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
