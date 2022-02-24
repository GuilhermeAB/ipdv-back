import { faker } from '@faker-js/faker';
import ValidationError from '../../../../util/Error/validation-error';
import Role from '../..';
import { RoleModel } from '../../schema';
import add from '../add';

describe('role - add', () => {
  const saveSpy = jest.spyOn(RoleModel.prototype, 'save');
  const validateSpy = jest.spyOn(RoleModel.prototype, 'validate');
  const jsonSpy = jest.spyOn(RoleModel.prototype, 'toJSON');
  const existsByDescriptionSpy = jest.spyOn(Role, 'existsByDescription');

  it('should save a new role', async () => {
    expect.assertions(2);

    existsByDescriptionSpy.mockResolvedValueOnce(false);
    saveSpy.mockResolvedValueOnce(undefined);
    validateSpy.mockResolvedValueOnce(undefined);

    const result = await add({
      description: faker.lorem.word(5),
    });
    jsonSpy.mockResolvedValueOnce(result);

    expect(result.description).toBeDefined();
    expect(result._id).toBeDefined();
  });

  it('should throw an exception when role already exists', async () => {
    expect.assertions(1);
    existsByDescriptionSpy.mockResolvedValueOnce(true);

    const result = add({
      description: faker.lorem.word(5),
    });

    await expect(result).rejects.toThrow(new ValidationError('ROLE_ALREADY_EXISTS'));
  });
});
