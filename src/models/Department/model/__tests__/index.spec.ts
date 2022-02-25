import faker from '@faker-js/faker';
import makeDepartment from '..';
import ValidationError from '../../../../util/Error/validation-error';

describe('make department', () => {
  it('should make a department', () => {
    expect.assertions(3);

    const description = faker.lorem.word(5);
    const result = makeDepartment({
      description: description,
    });

    expect(result._id).toBeDefined();
    expect(result.description).toBe(description);
    expect(result.userList).toBeUndefined();
  });

  it('should throw an exception if _id is invalid', () => {
    expect.assertions(1);

    expect(
      () => makeDepartment({
        _id: 'invalid_uuid',
        description: faker.lorem.word(5),
      }),
    ).toThrow(new ValidationError('ID_INVALID'));
  });

  it('should throw an exception if description is undefined', () => {
    expect.assertions(1);

    expect(
      () => makeDepartment({
        description: undefined as any,
      }),
    ).toThrow(new ValidationError('DESCRIPTION_REQUIRED'));
  });

  it('should throw an exception if description length is invalid (MIN)', () => {
    expect.assertions(1);

    expect(
      () => makeDepartment({
        description: faker.lorem.word(2),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 }));
  });

  it('should throw an exception if description length is invalid (MAX)', () => {
    expect.assertions(1);

    expect(
      () => makeDepartment({
        description: faker.lorem.paragraph(20),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MAX_LENGTH', { value: 40 }));
  });
});
