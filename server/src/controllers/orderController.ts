import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { sendOrderConfirmationEmail } from '../services/emailService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, orderType, deliveryAddress, deliveryLat, deliveryLng, specialInstructions } =
      req.body;

    // Calculate total
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);

    // Add delivery fee if needed
    let deliveryFee = 0;
    if (orderType === 'Delivery' && deliveryLat && deliveryLng) {
      const restaurantLat = parseFloat(process.env.RESTAURANT_LAT || '25.4052');
      const restaurantLng = parseFloat(process.env.RESTAURANT_LNG || '55.5136');
      const distance = Math.sqrt(
        Math.pow(deliveryLat - restaurantLat, 2) + Math.pow(deliveryLng - restaurantLng, 2)
      );
      deliveryFee = 2.5 + distance * 1.0;
    }

    const newOrder = await Order.create({
      userId: req.userId!,
      items,
      totalAmount: totalAmount + deliveryFee,
      status: 'Pending',
      orderType,
      deliveryAddress,
      deliveryLat,
      deliveryLng,
      deliveryFee,
      specialInstructions,
      estimatedDeliveryTime: 30,
    });

    // Send confirmation email
    if (req.userId) {
      const user = await User.findByPk(req.userId);
      if (user) {
        await sendOrderConfirmationEmail(
          user.email,
          String(newOrder.id),
          newOrder.totalAmount
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const getAdminOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status) {
      where.status = status;
    }

    const orders = await Order.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Get admin orders error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await order.update({ status });

    return res.status(200).json({
      success: true,
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Only allow cancellation if order hasn't started preparation
    if (!['Pending', 'Confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order in current status',
      });
    }

    await order.update({ status: 'Cancelled' });

    return res.status(200).json({ success: true, message: 'Order cancelled', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    return res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
};
