import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  quantity: number;
  price: number;
  size?: string;
  modifiers?: Array<{
    name: string;
    price: number;
  }>;
  notes?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  kitchenStation: string;
  vatType: 'standard' | 'zero' | 'exempt';
  vatAmount: number;
  subtotal: number;
  total: number;
}

export interface IOrder extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  orderNumber: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'aggregator';
  aggregatorName?: 'talabat' | 'deliveroo' | 'noon' | 'careem';
  customerId?: mongoose.Types.ObjectId;
  tableId?: mongoose.Types.ObjectId;
  waiterId?: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  discounts: Array<{
    type: 'percentage' | 'fixed' | 'coupon' | 'staff';
    amount: number;
    reason?: string;
    approvedBy?: mongoose.Types.ObjectId;
  }>;
  totalDiscountAmount: number;
  serviceCharge: number;
  vatAmount: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  payments: Array<{
    method: 'cash' | 'card' | 'apple-pay' | 'samsung-pay' | 'online' | 'gift-card';
    amount: number;
    transactionId?: string;
    paidAt: Date;
  }>;
  deliveryAddress?: string;
  deliveryCoordinates?: {
    lat: number;
    lng: number;
  };
  estimatedDeliveryTime?: Date;
  driverId?: mongoose.Types.ObjectId;
  notes?: string;
  isOfflineOrder: boolean;
  syncedAt?: Date;
  kitchenTicketIds: mongoose.Types.ObjectId[];
  invoiceId?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

const OrderSchema = new Schema<IOrder>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  orderNumber: { type: String, required: true, unique: true },
  orderType: { 
    type: String, 
    enum: ['dine-in', 'takeaway', 'delivery', 'aggregator'], 
    required: true 
  },
  aggregatorName: { 
    type: String, 
    enum: ['talabat', 'deliveroo', 'noon', 'careem'] 
  },
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  tableId: { type: Schema.Types.ObjectId, ref: 'Table' },
  waiterId: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    nameAr: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: String,
    modifiers: [{
      name: String,
      price: Number
    }],
    notes: String,
    status: { 
      type: String, 
      enum: ['pending', 'preparing', 'ready', 'served'], 
      default: 'pending' 
    },
    kitchenStation: String,
    vatType: { type: String, enum: ['standard', 'zero', 'exempt'], default: 'standard' },
    vatAmount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  discounts: [{
    type: { type: String, enum: ['percentage', 'fixed', 'coupon', 'staff'] },
    amount: Number,
    reason: String,
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  totalDiscountAmount: { type: Number, default: 0 },
  serviceCharge: { type: Number, default: 0 },
  vatAmount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending',
    index: true
  },
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  payments: [{
    method: { 
      type: String, 
      enum: ['cash', 'card', 'apple-pay', 'samsung-pay', 'online', 'gift-card'] 
    },
    amount: Number,
    transactionId: String,
    paidAt: Date
  }],
  deliveryAddress: String,
  deliveryCoordinates: {
    lat: Number,
    lng: Number
  },
  estimatedDeliveryTime: Date,
  driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  isOfflineOrder: { type: Boolean, default: false },
  syncedAt: Date,
  kitchenTicketIds: [{ type: Schema.Types.ObjectId, ref: 'KitchenTicket' }],
  invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String
});

OrderSchema.index({ tenantId: 1, outletId: 1, createdAt: -1 });
OrderSchema.index({ tenantId: 1, status: 1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });

OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IOrder>('Order', OrderSchema);
