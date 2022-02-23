import { ClientSession } from 'mongoose';
import { UserType } from '..';
import { UserModel } from '../schema';

export default async function getList (session?: ClientSession): Promise<UserType[] | null> {
  const result = await UserModel
    .find({}, null, { session: session })
    .populate('role')
    .exec();

  return result;
}
