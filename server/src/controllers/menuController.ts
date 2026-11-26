import { Request, Response } from 'express';
import { MenuItem } from '../models/MenuItem';

export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const where: any = { available: true };
    if (category) {
      where.category = category;
    }

    const items = await MenuItem.findAll({ where, order: [['createdAt', 'DESC']] });

    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error('Get menu items error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    return res.status(200).json({ success: true, item });
  } catch (error) {
    console.error('Get menu item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch menu item' });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, category, price, description, image, preparationTime } = req.body;

    const newItem = await MenuItem.create({
      name,
      category,
      price,
      description,
      image,
      preparationTime,
      available: true,
    });

    return res.status(201).json({ success: true, message: 'Menu item created', item: newItem });
  } catch (error) {
    console.error('Create menu item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create menu item' });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, image, available, preparationTime } = req.body;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    await item.update({ name, category, price, description, image, available, preparationTime });

    return res.status(200).json({ success: true, message: 'Menu item updated', item });
  } catch (error) {
    console.error('Update menu item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update menu item' });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete menu item' });
  }
};
