import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  trn?: string;
  tradeLicense?: string;
  foodLicense?: string;
  documents: Array<{
    type: string;
    name: string;
    url: string;
    expiryDate?: Date;
  }>;
  isApproved: boolean;
  isActive: boolean;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SupplierSchema = new Schema<ISupplier>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  address: { type: String, required: true },
  trn: String,
  tradeLicense: String,
  foodLicense: String,
  documents: [{
    type: String,
    name: String,
    url: String,
    expiryDate: Date
  }],
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, min: 0, max: 5 },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

SupplierSchema.index({ tenantId: 1, isActive: 1 });

SupplierSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
