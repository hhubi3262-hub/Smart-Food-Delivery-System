import mongoose, { Schema, Document } from 'mongoose';

export interface IOutlet extends Document {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: Array<{
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }>;
  settings: {
    maxTables: number;
    enableDineIn: boolean;
    enableTakeaway: boolean;
    enableDelivery: boolean;
    deliveryRadius: number;
    deliveryFeePerKm: number;
    minDeliveryAmount: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OutletSchema = new Schema<IOutlet>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  openingHours: [{
    day: String,
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  }],
  settings: {
    maxTables: { type: Number, default: 20 },
    enableDineIn: { type: Boolean, default: true },
    enableTakeaway: { type: Boolean, default: true },
    enableDelivery: { type: Boolean, default: false },
    deliveryRadius: { type: Number, default: 10 },
    deliveryFeePerKm: { type: Number, default: 5 },
    minDeliveryAmount: { type: Number, default: 20 }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OutletSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IOutlet>('Outlet', OutletSchema);
