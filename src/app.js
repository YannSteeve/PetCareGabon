import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.js';
import appointmentsRouter from './routes/appointments.js';
import servicesRouter from './routes/services.js';
import reviewRoutes from './routes/reviews.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/appointments', authenticateToken, appointmentsRouter);
app.use('/api/services', authenticateToken, servicesRouter);
app.use('/reviews', authenticateToken, reviewRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;