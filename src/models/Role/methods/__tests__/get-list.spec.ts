import { RoleModel } from '../../schema';
import getList from '../get-list';

jest.mock('../../schema');

describe('role - get list', () => {
  const findSpy = jest.spyOn(RoleModel, 'find');
  it('should return role list', async () => {
    expect.assertions(1);

    findSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce([]),
    }));

    const result = await getList();

    expect(result).toBeDefined();
  });

  it('should return null if roles not found', async () => {
    expect.assertions(1);

    findSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce(null),
    }));

    const result = await getList();

    expect(result).toBeNull();
  });
});
