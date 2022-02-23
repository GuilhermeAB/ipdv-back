import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import User, { UserType } from '..';
import { UserModel } from '../schema';

export default async function remove (userId: string, session?: ClientSession): Promise<UserType> {
  const userExists = await User.existsById(userId);
  if (!userExists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        deletedAt: new Date(),
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
