import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface MenuItemAttributes {
  id: number;
  tenantId: number;
  outletId?: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  preparationTime: number;
  vatType: 'standard' | 'zero' | 'exempt';
  allergens: string;
  calories?: number;
  isHalal: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes> implements MenuItemAttributes {
  public id!: number;
  public tenantId!: number;
  public outletId?: number;
  public name!: string;
  public nameAr!: string;
  public description!: string;
  public descriptionAr!: string;
  public category!: string;
  public categoryAr!: string;
  public price!: number;
  public image?: string;
  public isAvailable!: boolean;
  public preparationTime!: number;
  public vatType!: 'standard' | 'zero' | 'exempt';
  public allergens!: string;
  public calories?: number;
  public isHalal!: boolean;
  public displayOrder!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tenants',
        key: 'id',
      },
    },
    outletId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'outlets',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nameAr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionAr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoryAr: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    preparationTime: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
    vatType: {
      type: DataTypes.ENUM('standard', 'zero', 'exempt'),
      defaultValue: 'standard',
    },
    allergens: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('allergens');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue('allergens', JSON.stringify(value));
      },
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isHalal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'menu_items',
    timestamps: true,
    indexes: [
      {
        fields: ['tenantId', 'category'],
      },
      {
        fields: ['isAvailable'],
      },
    ],
  }
);

export default MenuItem;
