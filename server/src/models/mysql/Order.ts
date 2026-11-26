import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface OrderAttributes {
  id: number;
  tenantId: number;
  outletId: number;
  orderNumber: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'aggregator';
  customerId?: number;
  tableId?: number;
  items: string;
  subtotal: number;
  discountAmount: number;
  serviceCharge: number;
  vatAmount: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  payments: string;
  notes?: string;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public tenantId!: number;
  public outletId!: number;
  public orderNumber!: string;
  public orderType!: 'dine-in' | 'takeaway' | 'delivery' | 'aggregator';
  public customerId?: number;
  public tableId?: number;
  public items!: string;
  public subtotal!: number;
  public discountAmount!: number;
  public serviceCharge!: number;
  public vatAmount!: number;
  public deliveryFee!: number;
  public totalAmount!: number;
  public status!: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  public paymentStatus!: 'unpaid' | 'partial' | 'paid' | 'refunded';
  public payments!: string;
  public notes?: string;
  public createdBy!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    outletId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    orderType: {
      type: DataTypes.ENUM('dine-in', 'takeaway', 'delivery', 'aggregator'),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    tableId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('items');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: any[]) {
        this.setDataValue('items', JSON.stringify(value));
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    serviceCharge: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    vatAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'partial', 'paid', 'refunded'),
      defaultValue: 'unpaid',
    },
    payments: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('payments');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: any[]) {
        this.setDataValue('payments', JSON.stringify(value));
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        fields: ['tenantId', 'outletId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['orderNumber'],
        unique: true,
      },
    ],
  }
);

export default Order;
