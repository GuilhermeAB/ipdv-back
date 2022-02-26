import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/Error/validation-error';
import { v4 as uuidv4 } from 'uuid';
import { RoleType } from '..';

export default function makeRole (role: RoleType): Readonly<RoleType> {
  if (role.id && !uuidValidateV4(role.id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!role.description) {
    throw new ValidationError('DESCRIPTION_REQUIRED');
  }

  if (role.description.length < 3) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 });
  }
  if (role.description.length > 30) {
    throw new ValidationError('DESCRIPTION_MAX_LENGTH', { value: 30 });
  }

  return Object.freeze({
    id: role.id || uuidv4(),
    description: role.description,
  });
}
