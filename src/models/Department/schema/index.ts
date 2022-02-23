import { model, Schema } from 'mongoose';
import { USER } from 'src/models/User/schema';
import { CostCenterModel } from 'src/models/CostCenter/schema';
import { DepartmentType } from '..';

export const DEPARTMENT = 'Department';

export const departmentSchema = new Schema({
  _id: String,
  description: String,
  userList: [{ type: String, ref: USER }],
}, {
  timestamps: true,
});

departmentSchema.pre('deleteOne', { document: false, query: true }, async function remove (next) {
  const doc = await this.model.findOne(this.getQuery()).exec();
  await CostCenterModel.updateMany({}, {
    $pull: {
      departmentList: doc._id,
    },
  }).exec();

  next();
});

export const DepartmentModel = model<DepartmentType>(DEPARTMENT, departmentSchema);
