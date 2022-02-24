import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/Error/validation-error';
import { v4 as uuidv4 } from 'uuid';
import Role from 'src/models/Role';
import { ClientSession } from 'mongoose';
import { UserType } from '..';

export default async function makeUser (user: UserType, session?: ClientSession): Promise<Readonly<UserType>> {
  if (user._id && !uuidValidateV4(user._id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!user.name) {
    throw new ValidationError('NAME_REQUIRED');
  }

  if (user.name.length < 3) {
    throw new ValidationError('NAME_MIN_LENGTH', { value: 3 });
  }
  if (user.name.length > 30) {
    throw new ValidationError('NAME_MAX_LENGTH', { value: 30 });
  }

  if (!user.role) {
    throw new ValidationError('ROLE_REQUIRED');
  }

  const roleExists = await Role.existsById(user.role, session);
  if (!roleExists) {
    throw new ValidationError('ROLE_NOT_FOUND');
  }

  return Object.freeze({
    _id: user._id || uuidv4(),
    name: user.name,
    role: user.role,
  });
}
