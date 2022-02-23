import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/Error/validation-error';
import { v4 as uuidv4 } from 'uuid';
import { DepartmentType } from '..';

export default function makeDepartment (role: DepartmentType): Readonly<DepartmentType> {
  if (role._id && !uuidValidateV4(role._id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!role.description) {
    throw new ValidationError('DESCRIPTION_REQUIRED');
  }

  if (role.description.length < 3) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 });
  }
  if (role.description.length > 40) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 40 });
  }

  return Object.freeze({
    _id: role._id || uuidv4(),
    description: role.description,
  });
}
