import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import appointmentRoutes from './routes/appointments';
import serviceRoutes from './routes/services';
import reviewRoutes from './routes/reviews';
import { notFound, errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});