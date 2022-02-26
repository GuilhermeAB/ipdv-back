import { Client } from 'pg';
import { sqlInsert } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import User, { UserType } from '..';
import makeUser from '../model';

export default async function add (user: UserType, session: Client): Promise<UserType> {
  const newUser = await makeUser(user, session);

  const exists = await User.existsByName(newUser.name, session);
  if (exists) {
    throw new ValidationError('USER_ALREADY_EXISTS');
  }

  const result = await sqlInsert({
    table: 'person',
    values: {
      id: newUser.id,
      name: newUser.name,
      role_id: newUser.role_id,
      created_at: new Date(),
    },
    client: session,
  });

  return result;
}
