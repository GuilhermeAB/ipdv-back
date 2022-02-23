import { model, Schema } from 'mongoose';
import { ROLE } from 'src/models/Role/schema';
import { UserType } from '..';

export const USER = 'User';

export const userSchema = new Schema({
  _id: String,
  name: String,
  role: { type: String, ref: ROLE },
}, {
  timestamps: true,
});

export const UserModel = model<UserType>(USER, userSchema);
