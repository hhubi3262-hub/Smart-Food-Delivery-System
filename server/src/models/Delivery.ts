import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IDelivery {
  id?: number;
  orderId: string;
  userId: string;
  deliveryPersonId?: string;
  status: 'Assigned' | 'Picked Up' | 'In Transit' | 'Delivered';
  currentLat?: number;
  currentLng?: number;
  pickupLat?: number;
  pickupLng?: number;
  dropoffLat?: number;
  dropoffLng?: number;
  distance?: number;
  estimatedTime?: number;
  actualDeliveryTime?: number;
  rating?: number;
  review?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DeliveryCreationAttributes
  extends Optional<IDelivery, 'id' | 'createdAt' | 'updatedAt'> {}

class DeliveryModel
  extends Model<IDelivery, DeliveryCreationAttributes>
  implements IDelivery
{
  public id!: number;
  public orderId!: string;
  public userId!: string;
  public deliveryPersonId?: string;
  public status!: 'Assigned' | 'Picked Up' | 'In Transit' | 'Delivered';
  public currentLat?: number;
  public currentLng?: number;
  public pickupLat?: number;
  public pickupLng?: number;
  public dropoffLat?: number;
  public dropoffLng?: number;
  public distance?: number;
  public estimatedTime?: number;
  public actualDeliveryTime?: number;
  public rating?: number;
  public review?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeliveryModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    deliveryPersonId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Assigned', 'Picked Up', 'In Transit', 'Delivered'),
      defaultValue: 'Assigned',
    },
    currentLat: { type: DataTypes.FLOAT, allowNull: true },
    currentLng: { type: DataTypes.FLOAT, allowNull: true },
    pickupLat: { type: DataTypes.FLOAT, allowNull: true },
    pickupLng: { type: DataTypes.FLOAT, allowNull: true },
    dropoffLat: { type: DataTypes.FLOAT, allowNull: true },
    dropoffLng: { type: DataTypes.FLOAT, allowNull: true },
    distance: { type: DataTypes.FLOAT, allowNull: true },
    estimatedTime: { type: DataTypes.INTEGER, allowNull: true },
    actualDeliveryTime: { type: DataTypes.BIGINT, allowNull: true },
    rating: { type: DataTypes.INTEGER, allowNull: true },
    review: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'app_deliveries',
    timestamps: true,
  }
);

export const Delivery = DeliveryModel;
