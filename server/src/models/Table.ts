import mongoose, { Schema, Document } from 'mongoose';

export interface ITable extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  tableNumber: string;
  section: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrderId?: mongoose.Types.ObjectId;
  assignedWaiterId?: mongoose.Types.ObjectId;
  position: {
    x: number;
    y: number;
  };
  shape: 'rectangle' | 'circle' | 'square';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema = new Schema<ITable>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  tableNumber: { type: String, required: true },
  section: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved', 'cleaning'],
    default: 'available'
  },
  currentOrderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  assignedWaiterId: { type: Schema.Types.ObjectId, ref: 'User' },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  shape: { type: String, enum: ['rectangle', 'circle', 'square'], default: 'rectangle' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TableSchema.index({ tenantId: 1, outletId: 1, tableNumber: 1 }, { unique: true });

TableSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ITable>('Table', TableSchema);
