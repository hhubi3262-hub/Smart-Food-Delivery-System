import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

interface TenantAttributes {
  id: number;
  businessName: string;
  businessNameAr: string;
  legalName: string;
  trn: string;
  tradeLicenseNumber: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  plan: 'basic' | 'standard' | 'premium';
  subscriptionStatus: 'trial' | 'active' | 'suspended' | 'cancelled';
  subscriptionStart: Date;
  subscriptionEnd: Date;
  trialEndsAt?: Date;
  maxOutlets: number;
  maxUsers: number;
  maxDevices: number;
  enabledModules: string;
  currency: string;
  timezone: string;
  defaultLanguage: 'en' | 'ar';
  serviceChargePercent: number;
  vatPercent: number;
  receiptFooter?: string;
  receiptFooterAr?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TenantCreationAttributes extends Optional<TenantAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Tenant extends Model<TenantAttributes, TenantCreationAttributes> implements TenantAttributes {
  public id!: number;
  public businessName!: string;
  public businessNameAr!: string;
  public legalName!: string;
  public trn!: string;
  public tradeLicenseNumber!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public logo?: string;
  public plan!: 'basic' | 'standard' | 'premium';
  public subscriptionStatus!: 'trial' | 'active' | 'suspended' | 'cancelled';
  public subscriptionStart!: Date;
  public subscriptionEnd!: Date;
  public trialEndsAt?: Date;
  public maxOutlets!: number;
  public maxUsers!: number;
  public maxDevices!: number;
  public enabledModules!: string;
  public currency!: string;
  public timezone!: string;
  public defaultLanguage!: 'en' | 'ar';
  public serviceChargePercent!: number;
  public vatPercent!: number;
  public receiptFooter?: string;
  public receiptFooterAr?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessNameAr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    legalName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    trn: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    tradeLicenseNumber: {
      type: DataTypes.STRING(50),
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
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    plan: {
      type: DataTypes.ENUM('basic', 'standard', 'premium'),
      defaultValue: 'basic',
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('trial', 'active', 'suspended', 'cancelled'),
      defaultValue: 'trial',
    },
    subscriptionStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trialEndsAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    maxOutlets: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    maxUsers: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    maxDevices: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    enabledModules: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('enabledModules');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue('enabledModules', JSON.stringify(value));
      },
    },
    currency: {
      type: DataTypes.STRING(10),
      defaultValue: 'AED',
    },
    timezone: {
      type: DataTypes.STRING(50),
      defaultValue: 'Asia/Dubai',
    },
    defaultLanguage: {
      type: DataTypes.ENUM('en', 'ar'),
      defaultValue: 'en',
    },
    serviceChargePercent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
    vatPercent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 5,
    },
    receiptFooter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    receiptFooterAr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'tenants',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['trn'],
      },
      {
        fields: ['subscriptionStatus'],
      },
    ],
  }
);

export default Tenant;
