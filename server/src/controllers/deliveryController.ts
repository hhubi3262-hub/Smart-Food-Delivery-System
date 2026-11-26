import { Request, Response } from 'express';
import { Delivery } from '../models/Delivery';
import { getDistance, calculateDeliveryFee } from '../services/googleMapsService';

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const { orderId, pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body;

    // Calculate distance and delivery fee
    const distanceResult = await getDistance(pickupLat, pickupLng, dropoffLat, dropoffLng);
    const deliveryFee = calculateDeliveryFee(distanceResult.distance);

    const newDelivery = await Delivery.create({
      orderId,
      userId: req.userId!,
      pickupLat,
      pickupLng,
      dropoffLat,
      dropoffLng,
      distance: distanceResult.distance,
      estimatedTime: Math.ceil(distanceResult.duration / 60),
      status: 'Assigned',
    });

    return res.status(201).json({
      success: true,
      message: 'Delivery created',
      delivery: newDelivery,
      deliveryFee,
    });
  } catch (error) {
    console.error('Create delivery error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create delivery' });
  }
};

export const getDelivery = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const delivery = await Delivery.findOne({ where: { orderId } });
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    return res.status(200).json({ success: true, delivery });
  } catch (error) {
    console.error('Get delivery error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch delivery' });
  }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, currentLat, currentLng } = req.body;

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    await delivery.update({
      status,
      currentLat,
      currentLng,
      ...(status === 'Delivered' && { actualDeliveryTime: Date.now() }),
    });

    return res.status(200).json({
      success: true,
      message: 'Delivery status updated',
      delivery,
    });
  } catch (error) {
    console.error('Update delivery status error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update delivery status' });
  }
};

export const rateDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    await delivery.update({ rating, review });

    return res.status(200).json({ success: true, message: 'Delivery rated', delivery });
  } catch (error) {
    console.error('Rate delivery error:', error);
    return res.status(500).json({ success: false, message: 'Failed to rate delivery' });
  }
};
