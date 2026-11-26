import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  businessName: string;
  businessNameAr: string;
  legalName: string;
  trn: string; // Tax Registration Number
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
  enabledModules: string[];
  settings: {
    currency: string;
    timezone: string;
    defaultLanguage: 'en' | 'ar';
    serviceChargePercent: number;
    vatPercent: number;
    receiptFooter: string;
    receiptFooterAr: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>({
  businessName: { type: String, required: true },
  businessNameAr: { type: String, required: true },
  legalName: { type: String, required: true },
  trn: { type: String, required: true, unique: true },
  tradeLicenseNumber: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  logo: String,
  plan: { 
    type: String, 
    enum: ['basic', 'standard', 'premium'], 
    default: 'basic' 
  },
  subscriptionStatus: { 
    type: String, 
    enum: ['trial', 'active', 'suspended', 'cancelled'],
    default: 'trial'
  },
  subscriptionStart: { type: Date, required: true },
  subscriptionEnd: { type: Date, required: true },
  trialEndsAt: Date,
  maxOutlets: { type: Number, default: 1 },
  maxUsers: { type: Number, default: 5 },
  maxDevices: { type: Number, default: 3 },
  enabledModules: [{ type: String }],
  settings: {
    currency: { type: String, default: 'AED' },
    timezone: { type: String, default: 'Asia/Dubai' },
    defaultLanguage: { type: String, enum: ['en', 'ar'], default: 'en' },
    serviceChargePercent: { type: Number, default: 0 },
    vatPercent: { type: Number, default: 5 },
    receiptFooter: String,
    receiptFooterAr: String
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TenantSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ITenant>('Tenant', TenantSchema);
