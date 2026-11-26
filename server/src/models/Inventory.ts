import mongoose, { Schema, Document } from 'mongoose';

// Ingredient Model
export interface IIngredient extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId?: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  unit: string;
  unitAr: string;
  isHalal: boolean;
  allergen?: string;
  supplierId?: mongoose.Types.ObjectId;
  minStockLevel: number;
  maxStockLevel: number;
  currentStock: number;
  unitCost: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IngredientSchema = new Schema<IIngredient>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet' },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  unit: { type: String, required: true },
  unitAr: { type: String, required: true },
  isHalal: { type: Boolean, default: true },
  allergen: String,
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  minStockLevel: { type: Number, default: 0 },
  maxStockLevel: { type: Number, default: 0 },
  currentStock: { type: Number, default: 0 },
  unitCost: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

IngredientSchema.index({ tenantId: 1, outletId: 1 });

// Recipe Model
export interface IRecipe extends Document {
  tenantId: mongoose.Types.ObjectId;
  menuItemId: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  ingredients: Array<{
    ingredientId: mongoose.Types.ObjectId;
    quantity: number;
    unit: string;
  }>;
  costPerServing: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new Schema<IRecipe>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  ingredients: [{
    ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    quantity: { type: Number, required: true },
    unit: String
  }],
  costPerServing: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

RecipeSchema.index({ tenantId: 1, menuItemId: 1 });

// Stock Batch Model (for traceability)
export interface IStockBatch extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  ingredientId: mongoose.Types.ObjectId;
  batchNumber: string;
  supplierId: mongoose.Types.ObjectId;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  receivedDate: Date;
  expiryDate?: Date;
  vehicleTemperature?: number;
  condition: 'good' | 'acceptable' | 'rejected';
  receivedBy: mongoose.Types.ObjectId;
  usedQuantity: number;
  remainingQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const StockBatchSchema = new Schema<IStockBatch>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  batchNumber: { type: String, required: true, unique: true },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  quantity: { type: Number, required: true },
  unit: String,
  costPerUnit: Number,
  totalCost: Number,
  receivedDate: { type: Date, required: true, default: Date.now },
  expiryDate: Date,
  vehicleTemperature: Number,
  condition: { 
    type: String, 
    enum: ['good', 'acceptable', 'rejected'],
    default: 'good'
  },
  receivedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  usedQuantity: { type: Number, default: 0 },
  remainingQuantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

StockBatchSchema.index({ tenantId: 1, outletId: 1, expiryDate: 1 });
StockBatchSchema.index({ batchNumber: 1 }, { unique: true });

export const Ingredient = mongoose.model<IIngredient>('Ingredient', IngredientSchema);
export const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);
export const StockBatch = mongoose.model<IStockBatch>('StockBatch', StockBatchSchema);
