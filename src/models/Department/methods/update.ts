import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import Department, { DepartmentType } from '..';
import makeDepartment from '../model';
import { DepartmentModel } from '../schema';

export default async function update (department: DepartmentType, session?: ClientSession): Promise<DepartmentType> {
  const newDepartment = makeDepartment(department);

  const exists = await Department.existsById(newDepartment._id!);
  if (!exists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const result = await DepartmentModel.findOneAndUpdate(
    { _id: newDepartment._id },
    {
      $set: {
        description: newDepartment.description,
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
