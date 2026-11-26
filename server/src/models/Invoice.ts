import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  invoiceDate: Date;
  customerName?: string;
  customerTRN?: string;
  items: Array<{
    description: string;
    descriptionAr: string;
    quantity: number;
    unitPrice: number;
    vatType: 'standard' | 'zero' | 'exempt';
    vatRate: number;
    vatAmount: number;
    totalAmount: number;
  }>;
  subtotal: number;
  discountAmount: number;
  serviceCharge: number;
  taxableSales: number;
  zeroRatedSales: number;
  exemptSales: number;
  totalVAT: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'draft' | 'issued' | 'cancelled';
  creditNoteIds: mongoose.Types.ObjectId[];
  eInvoiceStatus?: 'pending' | 'sent' | 'accepted' | 'rejected' | 'failed';
  eInvoiceId?: string;
  eInvoiceError?: string;
  qrCode?: string;
  printCount: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  invoiceDate: { type: Date, required: true, default: Date.now },
  customerName: String,
  customerTRN: String,
  items: [{
    description: String,
    descriptionAr: String,
    quantity: Number,
    unitPrice: Number,
    vatType: { type: String, enum: ['standard', 'zero', 'exempt'] },
    vatRate: Number,
    vatAmount: Number,
    totalAmount: Number
  }],
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  serviceCharge: { type: Number, default: 0 },
  taxableSales: { type: Number, default: 0 },
  zeroRatedSales: { type: Number, default: 0 },
  exemptSales: { type: Number, default: 0 },
  totalVAT: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: String,
  status: { 
    type: String, 
    enum: ['draft', 'issued', 'cancelled'],
    default: 'issued'
  },
  creditNoteIds: [{ type: Schema.Types.ObjectId, ref: 'CreditNote' }],
  eInvoiceStatus: { 
    type: String, 
    enum: ['pending', 'sent', 'accepted', 'rejected', 'failed']
  },
  eInvoiceId: String,
  eInvoiceError: String,
  qrCode: String,
  printCount: { type: Number, default: 0 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

InvoiceSchema.index({ tenantId: 1, invoiceNumber: 1 }, { unique: true });
InvoiceSchema.index({ tenantId: 1, outletId: 1, invoiceDate: -1 });

InvoiceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
