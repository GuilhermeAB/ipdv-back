import { ClientSession } from 'mongoose';
import { CostCenterType } from '..';
import { CostCenterModel } from '../schema';

/**
 * Get list
 *
 * @param {ClientSession} session - Session
 * @returns Returns list or null
 */
export default async function getList (session?: ClientSession): Promise<CostCenterType[] | null> {
  const result = await CostCenterModel.find({}, null, { session: session }).exec();

  return result;
}
