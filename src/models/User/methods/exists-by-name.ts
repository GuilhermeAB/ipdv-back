import { ClientSession } from 'mongoose';
import { UserModel } from '../schema';

/**
 * Check if exists by name
 *
 * @param {string} name - Identifier
 * @returns return true if exists
 */
export default async function existsByName (name: string, session?: ClientSession): Promise<boolean> {
  const result = await UserModel.findOne({ name: name }, null, { session: session }).exec();

  return !!result;
}
