import { Client } from 'pg';
import { sqlInsert } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import Role, { RoleType } from '..';
import makeRole from '../model';

export default async function add (role: RoleType, session: Client): Promise<RoleType> {
  const newRole = makeRole(role);

  const exists = await Role.existsByDescription(newRole.description, session);
  if (exists) {
    throw new ValidationError('ROLE_ALREADY_EXISTS');
  }

  const result = await sqlInsert({
    table: 'person_role',
    values: {
      id: newRole.id,
      description: newRole.description,
      created_at: new Date(),
    },
    client: session,
  });

  return result;
}
