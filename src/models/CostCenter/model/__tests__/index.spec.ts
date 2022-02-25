import faker from '@faker-js/faker';
import makeCostCenter from '..';
import ValidationError from '../../../../util/Error/validation-error';

describe('make cost center', () => {
  it('should make a cost center', () => {
    expect.assertions(3);

    const description = faker.lorem.word(5);
    const result = makeCostCenter({
      description: description,
    });

    expect(result._id).toBeDefined();
    expect(result.description).toBe(description);
    expect(result.departmentList).toBeUndefined();
  });

  it('should throw an exception if _id is invalid', () => {
    expect.assertions(1);

    expect(
      () => makeCostCenter({
        _id: 'invalid_uuid',
        description: faker.lorem.word(5),
      }),
    ).toThrow(new ValidationError('ID_INVALID'));
  });

  it('should throw an exception if description is undefined', () => {
    expect.assertions(1);

    expect(
      () => makeCostCenter({
        description: undefined as any,
      }),
    ).toThrow(new ValidationError('DESCRIPTION_REQUIRED'));
  });

  it('should throw an exception if description length is invalid (MIN)', () => {
    expect.assertions(1);

    expect(
      () => makeCostCenter({
        description: faker.lorem.word(2),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 }));
  });

  it('should throw an exception if description length is invalid (MAX)', () => {
    expect.assertions(1);

    expect(
      () => makeCostCenter({
        description: faker.lorem.paragraph(20),
      }),
    ).toThrow(new ValidationError('DESCRIPTION_MAX_LENGTH', { value: 50 }));
  });
});
