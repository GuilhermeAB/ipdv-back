import { ClientSession } from 'mongoose';
import { RoleType } from '..';
import { RoleModel } from '../schema';

/**
 * Get roles
 *
 * @param {ClientSession} session - Session
 * @returns Returns roles or null
 */
export default async function getList (session?: ClientSession): Promise<RoleType[] | null> {
  const result = await RoleModel.find({}, null, { session: session }).exec();

  return result;
}
