import { Client } from 'pg';
import { sqlUpdate } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import User, { UserType } from '..';
import makeUser from '../model';

export default async function update (user: UserType, session: Client): Promise<UserType> {
  const newUser = await makeUser(user, session);

  const exists = await User.existsById(newUser.id!, session);
  if (!exists) {
    throw new ValidationError('USER_NOT_FOUND');
  }

  const result = await sqlUpdate({
    table: 'person',
    values: {
      name: newUser.name,
      role_id: newUser.role_id,
      updated_at: new Date(),
    },
    where: 'where id = $1',
    whereParams: [newUser.id],
    client: session,
  });

  return result;
}
