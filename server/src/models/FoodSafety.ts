import mongoose, { Schema, Document } from 'mongoose';

// Temperature Log Model
export interface ITemperatureLog extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  logType: 'fridge' | 'freezer' | 'hot-hold' | 'cooking' | 'cooling' | 'reheating';
  equipmentName: string;
  temperature: number;
  unit: 'C' | 'F';
  minLimit?: number;
  maxLimit?: number;
  isWithinRange: boolean;
  correctiveAction?: string;
  recordedBy: mongoose.Types.ObjectId;
  signedOffBy?: mongoose.Types.ObjectId;
  isReadOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemperatureLogSchema = new Schema<ITemperatureLog>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  logType: { 
    type: String, 
    enum: ['fridge', 'freezer', 'hot-hold', 'cooking', 'cooling', 'reheating'],
    required: true 
  },
  equipmentName: { type: String, required: true },
  temperature: { type: Number, required: true },
  unit: { type: String, enum: ['C', 'F'], default: 'C' },
  minLimit: Number,
  maxLimit: Number,
  isWithinRange: { type: Boolean, required: true },
  correctiveAction: String,
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  signedOffBy: { type: Schema.Types.ObjectId, ref: 'User' },
  isReadOnly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

TemperatureLogSchema.index({ tenantId: 1, outletId: 1, createdAt: -1 });

// Food Safety Checklist Model
export interface IFoodSafetyChecklist extends Document {
  tenantId: mongoose.Types.ObjectId;
  outletId: mongoose.Types.ObjectId;
  checklistType: 'opening' | 'closing' | 'cleaning' | 'daily';
  date: Date;
  items: Array<{
    task: string;
    taskAr: string;
    isCompleted: boolean;
    notes?: string;
    completedBy?: mongoose.Types.ObjectId;
    completedAt?: Date;
  }>;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: mongoose.Types.ObjectId;
  signedOffBy?: mongoose.Types.ObjectId;
  signedOffAt?: Date;
  isReadOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSafetyChecklistSchema = new Schema<IFoodSafetyChecklist>({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
  outletId: { type: Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  checklistType: { 
    type: String, 
    enum: ['opening', 'closing', 'cleaning', 'daily'],
    required: true 
  },
  date: { type: Date, required: true },
  items: [{
    task: String,
    taskAr: String,
    isCompleted: { type: Boolean, default: false },
    notes: String,
    completedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date
  }],
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  signedOffBy: { type: Schema.Types.ObjectId, ref: 'User' },
  signedOffAt: Date,
  isReadOnly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FoodSafetyChecklistSchema.index({ tenantId: 1, outletId: 1, date: -1 });

export const TemperatureLog = mongoose.model<ITemperatureLog>('TemperatureLog', TemperatureLogSchema);
export const FoodSafetyChecklist = mongoose.model<IFoodSafetyChecklist>('FoodSafetyChecklist', FoodSafetyChecklistSchema);
