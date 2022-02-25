import { UserModel } from '../../schema';
import getById from '../get-by-id';

jest.mock('../../schema');

describe('user - get by id', () => {
  const findOneSpy = jest.spyOn(UserModel, 'findOne');
  it('should return user', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      populate: jest.fn().mockImplementation((): any => ({
        exec: jest.fn().mockImplementation((): any => ({
          toJSON: jest.fn().mockResolvedValueOnce({}),
        })),
      })),
    }));

    const result = await getById('any_id');

    expect(result).toBeDefined();
  });

  it('should return undefined if user not found', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      populate: jest.fn().mockImplementation((): any => ({
        exec: jest.fn().mockResolvedValueOnce(undefined),
      })),
    }));

    const result = await getById('any_id');

    expect(result).toBeUndefined();
  });
});
