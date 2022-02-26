import { Client } from 'pg';
import { sqlDelete } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import Department from '..';

export default async function remove (departmentId: string, session: Client): Promise<boolean> {
  const departmentExists = await Department.existsById(departmentId, session);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  await sqlDelete({
    table: 'department_person',
    where: 'where department_id = $1',
    params: [departmentId],
    client: session,
  });

  await sqlDelete({
    table: 'department',
    where: 'where id = $1',
    params: [departmentId],
    client: session,
  });

  return true;
}
