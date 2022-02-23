import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import Role, { RoleType } from '..';
import makeRole from '../model';
import { RoleModel } from '../schema';

export default async function add (role: RoleType, session?: ClientSession): Promise<RoleType> {
  const newRole = makeRole(role);

  const exists = await Role.existsByDescription(newRole.description);
  if (exists) {
    throw new ValidationError('ROLE_ALREADY_EXISTS');
  }

  const result = new RoleModel(newRole);
  await result.validate();
  await result.save({ session: session });
  const item = result.toJSON();

  return item;
}
