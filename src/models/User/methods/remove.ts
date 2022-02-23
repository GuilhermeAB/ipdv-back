import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import User from '..';
import { UserModel } from '../schema';

export default async function remove (userId: string, session?: ClientSession): Promise<boolean> {
  const userExists = await User.existsById(userId);
  if (!userExists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  await UserModel.deleteOne(
    { _id: userId },
    {
      session: session,
    },
  ).exec();

  return true;
}
