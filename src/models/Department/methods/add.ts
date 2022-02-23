import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import Department, { DepartmentType } from '..';
import makeDepartment from '../model';
import { DepartmentModel } from '../schema';

export default async function add (department: DepartmentType, session?: ClientSession): Promise<DepartmentType> {
  const newDepartment = makeDepartment(department);

  const exists = await Department.existsByDescription(newDepartment.description);
  if (exists) {
    throw new ValidationError('DEPARTMENT_ALREADY_EXISTS');
  }

  const result = new DepartmentModel(newDepartment);
  await result.validate();
  await result.save({ session: session });
  const item = result.toJSON();

  return item;
}
