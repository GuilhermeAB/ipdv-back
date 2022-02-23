import { ClientSession } from 'mongoose';
import { UserType } from '..';
import { UserModel } from '../schema';

export default async function getById (id: string, session?: ClientSession): Promise<UserType | null> {
  const result = await UserModel.findOne({ _id: id }, null, { session: session }).exec();

  if (result) {
    return result.toJSON();
  }

  return result;
}
