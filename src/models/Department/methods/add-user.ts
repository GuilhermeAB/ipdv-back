import { ClientSession } from 'mongoose';
import User from 'src/models/User';
import ValidationError from 'src/util/Error/validation-error';
import Department from '..';
import { DepartmentModel } from '../schema';

export default async function addUser (userId: string, departmentId: string, session?: ClientSession): Promise<boolean> {
  if (!userId || !departmentId) {
    throw new ValidationError('ID_REQUIRED');
  }

  const userExists = await User.existsById(userId, session);
  if (!userExists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  const departmentExists = await Department.existsById(departmentId, session);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const alreadyHasUser = await Department.hasUser(departmentId, userId);
  if (alreadyHasUser) {
    throw new ValidationError('DEPARTMENT_ALREADY_HAS_USER');
  }

  await DepartmentModel.findOneAndUpdate(
    { _id: departmentId },
    {
      $push: {
        userList: userId,
      },
    },
    {
      session: session,
    },
  ).exec();

  return true;
}
