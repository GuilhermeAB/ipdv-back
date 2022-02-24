import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import User, { UserType } from '..';
import makeUser from '../model';
import { UserModel } from '../schema';

export default async function update (user: UserType, session?: ClientSession): Promise<UserType> {
  const newUser = await makeUser(user);

  const exists = await User.existsById(newUser._id!, session);
  if (!exists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  const result = await UserModel.findOneAndUpdate(
    { _id: newUser._id },
    {
      $set: {
        name: newUser.name,
        role: newUser.role,
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
