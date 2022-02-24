import { ClientSession } from 'mongoose';
import { DepartmentModel } from '../schema';

/**
 * Check if exists by id
 *
 * @param {string} id - Identifier
 * @returns return true if exists
 */
export default async function existsById (id: string, session?: ClientSession): Promise<boolean> {
  const result = await DepartmentModel.findOne({ _id: id }, null, { session: session }).exec();

  return !!result;
}
