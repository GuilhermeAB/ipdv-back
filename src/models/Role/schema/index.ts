import { model, Schema } from 'mongoose';
import { RoleType } from '..';

export const ROLE = 'Role';

export const roleSchema = new Schema({
  _id: String,
  description: String,
}, {
  timestamps: true,
});

export const RoleModel = model<RoleType>(ROLE, roleSchema);
