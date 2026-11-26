import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IReservation {
  id?: number;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: Date;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReservationCreationAttributes
  extends Optional<IReservation, 'id' | 'createdAt' | 'updatedAt'> {}

class ReservationModel
  extends Model<IReservation, ReservationCreationAttributes>
  implements IReservation
{
  public id!: number;
  public userId?: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public guests!: number;
  public date!: Date;
  public time!: string;
  public status!: 'Pending' | 'Confirmed' | 'Cancelled';
  public specialRequests?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ReservationModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
      defaultValue: 'Pending',
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'app_reservations',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['date'] },
      { fields: ['status'] },
    ],
  }
);

export const Reservation = ReservationModel;
