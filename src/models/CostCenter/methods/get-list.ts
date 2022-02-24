import { ClientSession } from 'mongoose';
import { DEPARTMENT } from 'src/models/Department/schema';
import { ROLE } from 'src/models/Role/schema';
import { USER } from 'src/models/User/schema';
import { CostCenterType } from '..';
import { CostCenterModel } from '../schema';

/**
 * Get list
 *
 * @param {ClientSession} session - Session
 * @returns Returns list or null
 */
export default async function getList (session?: ClientSession): Promise<CostCenterType[] | null> {
  const result = await CostCenterModel
    .find({}, null, { session: session })
    .populate({
      path: 'departmentList',
      model: DEPARTMENT,
      populate: {
        path: 'userList',
        model: USER,
        populate: {
          path: 'role',
          model: ROLE,
        },
      },
    })
    .exec();

  return result;
}
