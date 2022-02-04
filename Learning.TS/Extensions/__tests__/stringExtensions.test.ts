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
    const value = 'Blabla Blabla';
    const expectedValue = 'blablaBlabla';

    // When
    const actualValue = value.toCamelCase();

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });

  it('split', () => {
    // Given
    const expectedValue = ['abc', 'def', 'ghi', 'j'];
    const value = 'abcdefghij';

    // When
    const actualValue = value.split(3);

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });
});
