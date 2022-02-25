import { UserModel } from '../../schema';
import getList from '../get-list';

jest.mock('../../schema');

describe('user - get list', () => {
  const findSpy = jest.spyOn(UserModel, 'find');
  it('should return user list', async () => {
    expect.assertions(1);

    findSpy.mockImplementation((): any => ({
      populate: jest.fn().mockImplementation((): any => ({
        exec: jest.fn().mockResolvedValueOnce([]),
      })),
    }));

    const result = await getList();

    expect(result).toBeDefined();
  });

  it('should return null if users not found', async () => {
    expect.assertions(1);

    findSpy.mockImplementation((): any => ({
      populate: jest.fn().mockImplementation((): any => ({
        exec: jest.fn().mockResolvedValueOnce(null),
      })),
    }));

    const result = await getList();

    expect(result).toBeNull();
  });
});
