import { ClientSession } from 'mongoose';
import { ROLE } from 'src/models/Role/schema';
import { USER } from 'src/models/User/schema';
import { DepartmentType } from '..';
import { DepartmentModel } from '../schema';

/**
 * Get departments
 *
 * @param {ClientSession} session - Session
 * @returns Returns departments or null
 */
export default async function getList (session?: ClientSession): Promise<DepartmentType[] | null> {
  const result = await DepartmentModel
    .find({}, null, { session: session })
    .populate({
      path: 'userList',
      model: USER,
      populate: {
        path: 'role',
        model: ROLE,
      },
    })
    .exec();

  return result;
}
