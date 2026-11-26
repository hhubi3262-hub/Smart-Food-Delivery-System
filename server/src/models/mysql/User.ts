import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../../config/database';

interface UserAttributes {
  id: number;
  tenantId: number;
  outletId?: number;
  name: string;
  email: string;
  password?: string;
  pin?: string;
  role: 'superadmin' | 'owner' | 'manager' | 'cashier' | 'waiter' | 'kitchen' | 'pic' | 'customer';
  phone?: string;
  permissions: string;
  language: 'en' | 'ar' | 'hi';
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public tenantId!: number;
  public outletId?: number;
  public name!: string;
  public email!: string;
  public password?: string;
  public pin?: string;
  public role!: 'superadmin' | 'owner' | 'manager' | 'cashier' | 'waiter' | 'kitchen' | 'pic' | 'customer';
  public phone?: string;
  public permissions!: string;
  public language!: 'en' | 'ar' | 'hi';
  public isActive!: boolean;
  public lastLogin?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
  }

  public async comparePIN(candidatePIN: string): Promise<boolean> {
    if (!this.pin) return false;
    return bcrypt.compare(candidatePIN, this.pin);
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('superadmin', 'owner', 'manager', 'cashier', 'waiter', 'kitchen', 'pic', 'customer'),
      defaultValue: 'customer',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    permissions: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('permissions');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue('permissions', JSON.stringify(value));
      },
    },
    language: {
      type: DataTypes.ENUM('en', 'ar', 'hi'),
      defaultValue: 'en',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['tenantId', 'email'],
      },
      {
        fields: ['role'],
      },
    ],
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
        if (user.pin) {
          user.pin = await bcrypt.hash(user.pin, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password') && user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
        if (user.changed('pin') && user.pin) {
          user.pin = await bcrypt.hash(user.pin, 10);
        }
      },
    },
  }
);

export default User;
