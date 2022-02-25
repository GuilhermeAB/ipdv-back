import faker from '@faker-js/faker';
import User from '../..';
import ValidationError from '../../../../util/Error/validation-error';
import Role from '../../../Role';
import { UserModel } from '../../schema';
import update from '../update';

jest.mock('../../schema');

describe('user - update', () => {
  const findOneAndUpdateSpy = jest.spyOn(UserModel, 'findOneAndUpdate');
  const existsByIdSpy = jest.spyOn(User, 'existsById');
  jest.spyOn(Role, 'existsById').mockResolvedValue(true);

  const mockUser = {
    name: faker.lorem.word(5),
    role: faker.datatype.uuid(),
  };

  it('should update user', async () => {
    expect.assertions(1);

    existsByIdSpy.mockResolvedValueOnce(true);

    findOneAndUpdateSpy.mockImplementation((): any => ({
      exec: jest.fn().mockImplementation((): any => ({
        toJSON: jest.fn().mockResolvedValueOnce({}),
      })),
    }));

    const result = await update(mockUser);

    expect(result).toBeDefined();
  });

  it('should return an exception if user not found', async () => {
    expect.assertions(1);

    existsByIdSpy.mockResolvedValueOnce(false);

    const result = update(mockUser);

    await expect(result).rejects.toThrow(new ValidationError('USER_NOT_FOUND'));
  });
});
