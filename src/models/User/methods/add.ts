import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import User, { UserType } from '..';
import makeUser from '../model';
import { UserModel } from '../schema';

export default async function add (user: UserType, session?: ClientSession): Promise<UserType> {
  const newUser = await makeUser(user, session);

  const exists = await User.existsByName(newUser.name, session);
  if (exists) {
    throw new ValidationError('USER_ALREADY_EXISTS');
  }

  const result = new UserModel(newUser);
  await result.validate();
  await result.save({ session: session });
  const item = result.toJSON();

  return item;
}
