import { model, Schema } from 'mongoose';
import { DEPARTMENT } from 'src/models/Department/schema';
import { CostCenterType } from '..';

export const COST_CENTER = 'Cost_center';

export const costCenterSchema = new Schema({
  _id: String,
  description: String,
  departmentList: [{ type: String, ref: DEPARTMENT }],
}, {
  timestamps: true,
});

export const CostCenterModel = model<CostCenterType>(COST_CENTER, costCenterSchema);
