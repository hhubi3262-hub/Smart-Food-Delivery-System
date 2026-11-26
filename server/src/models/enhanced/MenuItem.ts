import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId?: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  price: number;
  priceByChannel: {
    dineIn?: number;
    takeaway?: number;
    delivery?: number;
    talabat?: number;
    deliveroo?: number;
    noon?: number;
    careem?: number;
  };
  image?: string;
  isAvailable: boolean;
  preparationTime: number;
  vatType: 'standard' | 'zero' | 'exempt';
  sizes?: Array<{
    name: string;
    nameAr: string;
    price: number;
  }>;
  modifiers?: Array<{
    name: string;
    nameAr: string;
    price: number;
    isRequired: boolean;
  }>;
  allergens: string[];
  calories?: number;
  isHalal: boolean;
  recipeId?: mongoose.Types.ObjectId;
  displayOrder: number;
  availableFrom?: string;
  availableUntil?: string;
  kitchenStation: 'kitchen' | 'bar' | 'dessert' | 'grill';
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet' },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  description: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true, index: true },
  categoryAr: { type: String, required: true },
  price: { type: Number, required: true },
  priceByChannel: {
    dineIn: Number,
    takeaway: Number,
    delivery: Number,
    talabat: Number,
    deliveroo: Number,
    noon: Number,
    careem: Number
  },
  image: String,
  isAvailable: { type: Boolean, default: true },
  preparationTime: { type: Number, default: 15 },
  vatType: { type: String, enum: ['standard', 'zero', 'exempt'], default: 'standard' },
  sizes: [{
    name: String,
    nameAr: String,
    price: Number
  }],
  modifiers: [{
    name: String,
    nameAr: String,
    price: Number,
    isRequired: { type: Boolean, default: false }
  }],
  allergens: [String],
  calories: Number,
  isHalal: { type: Boolean, default: true },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  displayOrder: { type: Number, default: 0 },
  availableFrom: String,
  availableUntil: String,
  kitchenStation: { 
    type: String, 
    enum: ['kitchen', 'bar', 'dessert', 'grill'], 
    default: 'kitchen' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

MenuItemSchema.index({ tenantId: 1, category: 1, displayOrder: 1 });
MenuItemSchema.index({ tenantId: 1, outletId: 1 });

MenuItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
