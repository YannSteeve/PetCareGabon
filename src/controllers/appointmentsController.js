import express from 'express';
import { PrismaClient } from '@prisma/client';

const { Request, Response } = express;
const prisma = new PrismaClient();

const createAppointment = async (req, res) => {
  const { userId, serviceId, date, status } = req.body;

  try {
    // Créer le rendez-vous dans la base de données
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        serviceId,
        date,
        status,
      },
    });

    // Répondre avec le rendez-vous créé
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    // Répondre avec un message d'erreur en cas d'échec
    res.status(400).json({ error: 'Error creating appointment' });
  }
};

const getAppointments = async (req, res) => {
  try {
    // Récupérer tous les rendez-vous
    const appointments = await prisma.appointment.findMany();
    
    // Répondre avec la liste des rendez-vous
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    // Répondre avec un message d'erreur en cas d'échec
    res.status(400).json({ error: 'Error fetching appointments' });
  }
};

export {
  createAppointment,
  getAppointments,
};
