import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IOrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface IOrder {
  id?: number;
  userId: string;
  items: IOrderItem[] | string;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderType: 'Delivery' | 'Pickup';
  deliveryAddress?: string;
  deliveryLat?: number;
  deliveryLng?: number;
  deliveryFee?: number;
  specialInstructions?: string;
  estimatedDeliveryTime?: number;
  orderedAt?: Date;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<IOrder, 'id' | 'createdAt' | 'updatedAt'> {}

class OrderModel
  extends Model<IOrder, OrderCreationAttributes>
  implements IOrder
{
  public id!: number;
  public userId!: string;
  public items!: IOrderItem[] | string;
  public totalAmount!: number;
  public status!: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  public orderType!: 'Delivery' | 'Pickup';
  public deliveryAddress?: string;
  public deliveryLat?: number;
  public deliveryLng?: number;
  public deliveryFee?: number;
  public specialInstructions?: string;
  public estimatedDeliveryTime?: number;
  public orderedAt?: Date;
  public deliveredAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const raw = this.getDataValue('items');
        if (typeof raw === 'string') {
          try { return JSON.parse(raw); } catch { return []; }
        }
        return raw;
      },
      set(value: IOrderItem[]) {
        this.setDataValue('items', JSON.stringify(value) as any);
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'),
      defaultValue: 'Pending',
    },
    orderType: {
      type: DataTypes.ENUM('Delivery', 'Pickup'),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    deliveryLat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    deliveryLng: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estimatedDeliveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'app_orders',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['status'] },
    ],
  }
);

export const Order = OrderModel;
