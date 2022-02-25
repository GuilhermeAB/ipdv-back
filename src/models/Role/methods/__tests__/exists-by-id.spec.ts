import { RoleModel } from '../../schema';
import existsById from '../exists-by-id';

jest.mock('../../schema');

describe('role - exists by description', () => {
  const findOneSpy = jest.spyOn(RoleModel, 'findOne');
  it('should return true if role exists', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce({}),
    }));

    const result = await existsById('any_id');

    expect(result).toBeTruthy();
  });

  it('should return false if role not exists', async () => {
    expect.assertions(1);

    findOneSpy.mockImplementation((): any => ({
      exec: jest.fn().mockResolvedValueOnce(undefined),
    }));

    const result = await existsById('any_id');

    expect(result).toBeFalsy();
  });
});
