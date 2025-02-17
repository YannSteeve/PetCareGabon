import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching services' });
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching service' });
  }
};

export const addReview = async (req, res) => {
  const { userId, serviceId, rating, comment } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        userId,
        serviceId,
        rating,
        comment,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Error adding review' });
  }
};