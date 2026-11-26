import mongoose, { Schema, Document } from 'mongoose';

export interface IShift extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  shiftNumber: string;
  startTime: Date;
  endTime?: Date;
  openingCash: number;
  closingCash?: number;
  expectedCash?: number;
  cashVariance?: number;
  cashSales: number;
  cardSales: number;
  onlineSales: number;
  otherSales: number;
  totalSales: number;
  refunds: number;
  discounts: number;
  serviceCharges: number;
  vatCollected: number;
  orderCount: number;
  cashMovements: Array<{
    type: 'in' | 'out';
    amount: number;
    reason: string;
    timestamp: Date;
  }>;
  status: 'open' | 'closed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShiftSchema = new Schema<IShift>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  shiftNumber: { type: String, required: true, unique: true },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: Date,
  openingCash: { type: Number, required: true },
  closingCash: Number,
  expectedCash: Number,
  cashVariance: Number,
  cashSales: { type: Number, default: 0 },
  cardSales: { type: Number, default: 0 },
  onlineSales: { type: Number, default: 0 },
  otherSales: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  refunds: { type: Number, default: 0 },
  discounts: { type: Number, default: 0 },
  serviceCharges: { type: Number, default: 0 },
  vatCollected: { type: Number, default: 0 },
  orderCount: { type: Number, default: 0 },
  cashMovements: [{
    type: { type: String, enum: ['in', 'out'] },
    amount: Number,
    reason: String,
    timestamp: { type: Date, default: Date.now }
  }],
  status: { 
    type: String, 
    enum: ['open', 'closed'],
    default: 'open',
    index: true
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ShiftSchema.index({ tenantId: 1, outletId: 1, status: 1 });
ShiftSchema.index({ userId: 1, startTime: -1 });

ShiftSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IShift>('Shift', ShiftSchema);
