import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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