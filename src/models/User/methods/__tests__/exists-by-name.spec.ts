import { UserModel } from '../../schema';
import existsByName from '../exists-by-name';

jest.mock('../../schema');

describe('user - exists by name', () => {
  const findOneSpy = jest.spyOn(UserModel, 'findOne');
  it('should return true if user exists', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce({}),
    }));

    const result = await existsByName('any_id');

    expect(result).toBeTruthy();
  });

  it('should return false if user not exists', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce(undefined),
    }));

    const result = await existsByName('any_id');

    expect(result).toBeFalsy();
  });
});
