import User from '../..';
import ValidationError from '../../../../util/Error/validation-error';
import { UserModel } from '../../schema';
import remove from '../remove';

jest.mock('../../schema');

describe('user - remove', () => {
  const findOneSpy = jest.spyOn(UserModel, 'deleteOne');
  const existsByIdSpy = jest.spyOn(User, 'existsById');

  it('should remove user', async () => {
    expect.assertions(1);

    existsByIdSpy.mockResolvedValueOnce(true);

    findOneSpy.mockImplementation((): any => ({
      exec: jest.fn(),
    }));

    const result = await remove('any_id');

    expect(result).toBeTruthy();
  });

  it('should return an exception if user not found', async () => {
    expect.assertions(1);

    existsByIdSpy.mockResolvedValueOnce(false);

    const result = remove('any_id');

    await expect(result).rejects.toThrow(new ValidationError('USER_NOT_FOUND'));
  });
});
