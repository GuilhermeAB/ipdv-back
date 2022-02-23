import { model, Schema } from 'mongoose';
import { USER } from 'src/models/User/schema';
import { DepartmentType } from '..';

export const DEPARTMENT = 'Department';

export const departmentSchema = new Schema({
  _id: String,
  description: String,
  userList: [{ type: String, ref: USER }],
}, {
  timestamps: true,
});

export const DepartmentModel = model<DepartmentType>(DEPARTMENT, departmentSchema);
