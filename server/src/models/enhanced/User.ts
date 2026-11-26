import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  pin?: string;
  role: 'superadmin' | 'owner' | 'manager' | 'cashier' | 'waiter' | 'kitchen' | 'pic' | 'customer';
  phone?: string;
  permissions: string[];
  language: 'en' | 'ar' | 'hi';
  isActive: boolean;
  lastLogin?: Date;
  healthCardExpiry?: Date;
  foodHandlerCertExpiry?: Date;
  picCertExpiry?: Date;
  staffDocuments?: Array<{
    type: string;
    url: string;
    expiryDate?: Date;
  }>;
  loyaltyPoints?: number;
  preferences?: any;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  comparePIN(candidatePIN: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet' },
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  password: { type: String },
  pin: { type: String },
  role: { 
    type: String, 
    enum: ['superadmin', 'owner', 'manager', 'cashier', 'waiter', 'kitchen', 'pic', 'customer'],
    default: 'customer',
    index: true
  },
  phone: String,
  permissions: [{ type: String }],
  language: { type: String, enum: ['en', 'ar', 'hi'], default: 'en' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  healthCardExpiry: Date,
  foodHandlerCertExpiry: Date,
  picCertExpiry: Date,
  staffDocuments: [{
    type: { type: String },
    url: String,
    expiryDate: Date
  }],
  loyaltyPoints: { type: Number, default: 0 },
  preferences: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });

UserSchema.pre('save', async function(next) {
  this.updatedAt = new Date();
  
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  if (this.isModified('pin') && this.pin) {
    this.pin = await bcrypt.hash(this.pin, 10);
  }
  
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.comparePIN = async function(candidatePIN: string): Promise<boolean> {
  if (!this.pin) return false;
  return bcrypt.compare(candidatePIN, this.pin);
};

export default mongoose.model<IUser>('User', UserSchema);
