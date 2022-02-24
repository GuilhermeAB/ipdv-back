import { faker } from '@faker-js/faker';
import Role from '../../../Role';
import User from '../..';
import ValidationError from '../../../../util/Error/validation-error';
import { UserModel } from '../../schema';
import add from '../add';

describe('user - add', () => {
  const roleExistsByIdSpy = jest.spyOn(Role, 'existsById');
  const saveSpy = jest.spyOn(UserModel.prototype, 'save');
  const validateSpy = jest.spyOn(UserModel.prototype, 'validate');
  const jsonSpy = jest.spyOn(UserModel.prototype, 'toJSON');
  const existsByNameSpy = jest.spyOn(User, 'existsByName');

  it('should save a new user', async () => {
    expect.assertions(3);

    roleExistsByIdSpy.mockResolvedValue(true);
    existsByNameSpy.mockResolvedValueOnce(false);
    saveSpy.mockResolvedValueOnce(undefined);
    validateSpy.mockResolvedValueOnce(undefined);

    const name = faker.lorem.word(5);
    const result = await add({
      name: name,
      role: faker.datatype.uuid(),
    });
    jsonSpy.mockResolvedValueOnce(result);

    expect(result._id).toBeDefined();
    expect(result.name).toBe(name);
    expect(result.role).toBeDefined();
  });

  it('should throw an exception if user already exists', async () => {
    expect.assertions(1);

    roleExistsByIdSpy.mockResolvedValue(true);
    existsByNameSpy.mockResolvedValueOnce(true);

    const result = add({
      name: faker.lorem.word(5),
      role: faker.datatype.uuid(),
    });

    await expect(result).rejects.toThrow(new ValidationError('USER_ALREADY_EXISTS'));
  });
});
