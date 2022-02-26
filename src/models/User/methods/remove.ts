import { Client } from 'pg';
import { sqlDelete } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import User from '..';

export default async function remove (userId: string, session: Client): Promise<boolean> {
  const userExists = await User.existsById(userId, session);
  if (!userExists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  await sqlDelete({
    table: 'department_person',
    where: 'where person_id = $1',
    params: [userId],
    client: session,
  });

  await sqlDelete({
    table: 'person',
    where: 'where id = $1',
    params: [userId],
    client: session,
  });

  return true;
}
