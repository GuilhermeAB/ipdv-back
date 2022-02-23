import { ClientSession } from 'mongoose';
import { DepartmentType } from '..';
import { DepartmentModel } from '../schema';

/**
 * Get departments
 *
 * @param {ClientSession} session - Session
 * @returns Returns departments or null
 */
export default async function getList (session?: ClientSession): Promise<DepartmentType[] | null> {
  const result = await DepartmentModel.find({}, null, { session: session }).exec();

  return result;
}
