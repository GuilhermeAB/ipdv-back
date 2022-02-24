import faker from '@faker-js/faker';
import makeRole from '..';
import ValidationError from '../../../../util/Error/validation-error';

describe('make role', () => {
  it('should make a role', () => {
    expect.assertions(2);

    const description = faker.lorem.word(5);
    const result = makeRole({
      description: description,
    });

    expect(result._id).toBeDefined();
    expect(result.description).toBe(description);
  });

  it('should throw an exception if _id is invalid', () => {
    expect.assertions(1);

    expect(
      () => makeRole({
        _id: 'invalid_uuid',
        description: faker.lorem.word(5),
      }),
    ).toThrow(new ValidationError('ID_INVALID'));
  });

  it('should throw an exception if description length is invalid (MIN)', () => {
    expect.assertions(1);

    expect(
      () => makeRole({
        description: faker.lorem.word(2),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 }));
  });

  it('should throw an exception if description length is invalid (MAX)', () => {
    expect.assertions(1);

    expect(
      () => makeRole({
        description: faker.lorem.paragraph(20),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MAX_LENGTH', { value: 30 }));
  });
});
