import { model, Schema } from 'mongoose';
import { DepartmentModel } from 'src/models/Department/schema';
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

userSchema.pre('deleteOne', { document: false, query: true }, async function remove (next) {
  const doc = await this.model.findOne(this.getQuery()).exec();
  await DepartmentModel.updateMany({}, {
    $pull: {
      userList: doc._id,
    },
  }).exec();

  next();
});

export const UserModel = model<UserType>(USER, userSchema);
