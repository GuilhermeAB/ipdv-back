import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import Department from '..';
import { DepartmentModel } from '../schema';

export default async function remove (departmentId: string, session?: ClientSession): Promise<boolean> {
  const departmentExists = await Department.existsById(departmentId);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  await DepartmentModel.deleteOne(
    { _id: departmentId },
    {
      session: session,
    },
  ).exec();

  return true;
}
