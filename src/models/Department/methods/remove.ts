import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import Department, { DepartmentType } from '..';
import { DepartmentModel } from '../schema';

export default async function remove (departmentId: string, session?: ClientSession): Promise<DepartmentType> {
  const departmentExists = await Department.existsById(departmentId);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const result = await DepartmentModel.findOneAndUpdate(
    { _id: departmentId },
    {
      $set: {
        deletedAt: new Date(),
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
