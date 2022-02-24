import faker from '@faker-js/faker';
import Role from '../../../Role';
import makeUser from '..';
import ValidationError from '../../../../util/Error/validation-error';

describe('make user', () => {
  const roleExistsByIdSpy = jest.spyOn(Role, 'existsById');

  it('should make a user', async () => {
    expect.assertions(3);

    roleExistsByIdSpy.mockResolvedValueOnce(true);

    const name = faker.lorem.word(5);
    const result = await makeUser({
      name: name,
      role: faker.datatype.uuid(),
    });

    expect(result._id).toBeDefined();
    expect(result.name).toBe(name);
    expect(result.role).toBeDefined();
  });

  it('should throw an exception if _id is invalid', async () => {
    expect.assertions(1);

    await expect(
      makeUser({
        _id: 'invalid_uuid',
        name: faker.lorem.word(5),
        role: faker.datatype.uuid(),
      }),
    ).rejects.toThrow(new ValidationError('ID_INVALID'));
  });

  it('should throw an exception if name length is invalid (MIN)', async () => {
    expect.assertions(1);

    await expect(
      makeUser({
        name: faker.lorem.word(2),
        role: faker.datatype.uuid(),
      }),
    ).rejects.toThrow(new ValidationError('NAME_MIN_LENGTH', { value: 3 }));
  });

  it('should throw an exception if name length is invalid (MAX)', async () => {
    expect.assertions(1);

    await expect(
      makeUser({
        name: faker.lorem.paragraph(20),
        role: faker.datatype.uuid(),
      }),
    ).rejects.toThrow(new ValidationError('NAME_MAX_LENGTH', { value: 30 }));
  });

  it('should throw an exception if role not found', async () => {
    expect.assertions(1);
    roleExistsByIdSpy.mockResolvedValueOnce(false);

    const result = makeUser({
      name: faker.lorem.word(5),
      role: faker.datatype.uuid(),
    });

    await expect(result).rejects.toThrow(new ValidationError('ROLE_NOT_FOUND'));
  });
});
