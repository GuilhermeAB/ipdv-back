import { Client } from 'pg';
import { sqlUpdate } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import Department, { DepartmentType } from '..';
import makeDepartment from '../model';

export default async function update (department: DepartmentType, session: Client): Promise<DepartmentType> {
  const newDepartment = makeDepartment(department);

  const exists = await Department.existsById(newDepartment.id!, session);
  if (!exists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const result = await sqlUpdate({
    table: 'department',
    values: {
      description: newDepartment.description,
      updated_at: new Date(),
    },
    where: 'where id = $1',
    whereParams: [newDepartment.id],
    client: session,
  });

  return result;
}
