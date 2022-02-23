import { ClientSession } from 'mongoose';
import { DepartmentType } from '..';
import { DepartmentModel } from '../schema';

export default async function getById (id: string, session?: ClientSession): Promise<DepartmentType | null> {
  const result = await DepartmentModel.findOne({ _id: id }, null, { session: session }).exec();

  if (result) {
    return result.toJSON();
  }

  return result;
}
