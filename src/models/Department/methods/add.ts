import { Client } from 'pg';
import { sqlInsert } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import Department, { DepartmentType } from '..';
import makeDepartment from '../model';
import addUser from './add-user';

export default async function add (department: DepartmentType, session: Client): Promise<DepartmentType> {
  const newDepartment = makeDepartment(department);

  const exists = await Department.existsByDescription(newDepartment.description, session);
  if (exists) {
    throw new ValidationError('DEPARTMENT_ALREADY_EXISTS');
  }

  const result = await sqlInsert({
    table: 'department',
    values: {
      id: newDepartment.id,
      description: newDepartment.description,
      created_at: new Date(),
    },
    client: session,
  });

  if (newDepartment.userList && newDepartment.userList.length) {
    const userList = (newDepartment.userList as string[]).map((item: string) => addUser(item, newDepartment.id!, session));
    await Promise.all(userList);
  }

  return result;
}
