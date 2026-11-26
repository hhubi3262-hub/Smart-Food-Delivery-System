import mongoose, { Schema, Document } from 'mongoose';

export interface IKitchenTicket extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  orderNumber: string;
  station: 'kitchen' | 'bar' | 'dessert' | 'grill';
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'aggregator';
  items: Array<{
    menuItemId: mongoose.Types.ObjectId;
    name: string;
    nameAr: string;
    quantity: number;
    notes?: string;
    status: 'pending' | 'preparing' | 'ready' | 'served';
  }>;
  status: 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  priority: 'normal' | 'high' | 'urgent';
  prepTime: number;
  startedAt?: Date;
  readyAt?: Date;
  completedAt?: Date;
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const KitchenTicketSchema = new Schema<IKitchenTicket>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  orderNumber: { type: String, required: true },
  station: { 
    type: String, 
    enum: ['kitchen', 'bar', 'dessert', 'grill'], 
    required: true,
    index: true
  },
  tableNumber: String,
  orderType: { 
    type: String, 
    enum: ['dine-in', 'takeaway', 'delivery', 'aggregator'], 
    required: true 
  },
  items: [{
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    nameAr: String,
    quantity: Number,
    notes: String,
    status: { 
      type: String, 
      enum: ['pending', 'preparing', 'ready', 'served'],
      default: 'pending'
    }
  }],
  status: { 
    type: String, 
    enum: ['new', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'new',
    index: true
  },
  priority: { 
    type: String, 
    enum: ['normal', 'high', 'urgent'], 
    default: 'normal' 
  },
  prepTime: { type: Number, required: true },
  startedAt: Date,
  readyAt: Date,
  completedAt: Date,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

KitchenTicketSchema.index({ tenantId: 1, outletId: 1, station: 1, status: 1 });

KitchenTicketSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IKitchenTicket>('KitchenTicket', KitchenTicketSchema);
