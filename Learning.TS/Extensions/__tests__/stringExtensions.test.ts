import {} from '../stringExtensions';

describe('stingExtensions', () => {
  it('toTitleCase', () => {
    // Given
    const expectedValue = 'Blabla Blabla';
    const value = 'blabla blabla';

    // When
    const actualValue = value.toTitleCase();

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });

  it('toCamelCase', () => {
    // Given
    const expectedValue = 'Blabla Blabla';
    const value = 'blablaBlabla';

    // When
    const actualValue = value.toCamelCase();

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });

  it('toPascalCase', () => {
    // Given
    const expectedValue = 'Blabla Blabla';
    const value = 'BlablaBlabla';

    // When
    const actualValue = value.toPascalCase();

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });
});
