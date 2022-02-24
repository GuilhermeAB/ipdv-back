import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/Error/validation-error';
import { v4 as uuidv4 } from 'uuid';
import { DepartmentType } from '..';

export default function makeDepartment (department: DepartmentType): Readonly<DepartmentType> {
  if (department._id && !uuidValidateV4(department._id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!department.description) {
    throw new ValidationError('DESCRIPTION_REQUIRED');
  }

  if (department.description.length < 3) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 });
  }
  if (department.description.length > 40) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 40 });
  }

  return Object.freeze({
    _id: department._id || uuidv4(),
    description: department.description,
    userList: department.userList,
  });
}
