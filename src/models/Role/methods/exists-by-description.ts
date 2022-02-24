import { ClientSession } from 'mongoose';
import { RoleModel } from '../schema';

/**
 * Check if exists by description
 *
 * @param {string} description - Identifier
 * @returns return true if exists
 */
export default async function existsByDescription (description: string, session?: ClientSession): Promise<boolean> {
  const result = await RoleModel.findOne({ description: description }, null, { session: session }).exec();

  return !!result;
}
