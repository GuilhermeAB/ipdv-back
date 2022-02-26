import { Client } from 'pg';
import { sqlDelete } from 'src/database/util';
import User from 'src/models/User';
import ValidationError from 'src/util/Error/validation-error';
import Department from '..';

export default async function removeUser (userId: string, departmentId: string, session: Client): Promise<boolean> {
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

  const alreadyHasUser = await Department.hasUser(departmentId, userId, session);
  if (!alreadyHasUser) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  await sqlDelete({
    table: 'department_person',
    where: 'where department_id = $1 person_id = $2',
    params: [departmentId, userId],
    client: session,
  });

  return true;
}
