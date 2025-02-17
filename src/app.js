import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import serviceRoutes from './routes/services.js';
import reviewRoutes from './routes/reviews.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/appointments', authenticateToken, appointmentRoutes);
app.use('/services', authenticateToken, serviceRoutes);
app.use('/reviews', authenticateToken, reviewRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;