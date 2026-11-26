import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface IMenuItem {
  id?: number;
  name: string;
  category: 'Coffee' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Desserts' | 'Drinks';
  price: number;
  description: string;
  image: string;
  available: boolean;
  ratings?: number;
  reviews?: number;
  preparationTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuItemCreationAttributes extends Optional<IMenuItem, 'id' | 'createdAt' | 'updatedAt'> {}

class MenuItemModel
  extends Model<IMenuItem, MenuItemCreationAttributes>
  implements IMenuItem
{
  public id!: number;
  public name!: string;
  public category!: 'Coffee' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Desserts' | 'Drinks';
  public price!: number;
  public description!: string;
  public image!: string;
  public available!: boolean;
  public ratings?: number;
  public reviews?: number;
  public preparationTime?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItemModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('Coffee', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Drinks'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ratings: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preparationTime: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
  },
  {
    sequelize,
    tableName: 'menu_items_app',
    timestamps: true,
    indexes: [
      { fields: ['category'] },
      { fields: ['available'] },
    ],
  }
);

export const MenuItem = MenuItemModel;
