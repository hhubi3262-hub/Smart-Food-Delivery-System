import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { sendReservationConfirmationEmail } from '../services/emailService';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, guests, date, time, specialRequests } = req.body;

    const newReservation = await Reservation.create({
      userId: req.userId,
      name,
      email,
      phone,
      guests,
      date,
      time,
      specialRequests,
      status: 'Pending',
    });

    // Send confirmation email
    await sendReservationConfirmationEmail(email, name, date, time, guests);

    return res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation: newReservation,
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create reservation' });
  }
};

export const getUserReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.userId },
      order: [['date', 'DESC']],
    });
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error('Get user reservations error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
  }
};

export const getAdminReservations = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status) {
      where.status = status;
    }

    const reservations = await Reservation.findAll({
      where,
      order: [['date', 'DESC']],
    });
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error('Get admin reservations error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    await reservation.update({ status });

    return res.status(200).json({
      success: true,
      message: 'Reservation status updated',
      reservation,
    });
  } catch (error) {
    console.error('Update reservation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update reservation' });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    if (reservation.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await reservation.update({ status: 'Cancelled' });

    return res.status(200).json({ success: true, message: 'Reservation cancelled' });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to cancel reservation' });
  }
};
