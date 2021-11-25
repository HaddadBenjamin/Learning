import { range } from '../arrayHelper';

describe('arrayHelper', () => {
  it('range should generate n value from 1 to n', () => {
    // Given
    const expectedValue = [1, 2, 3];

    // When
    const actualValue = range(3);

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });

  it('range should generate minimum to maximum values', () => {
    // Given
    const expectedValue = [5, 6, 7, 8, 9, 10];

    // When
    const actualValue = range(5, 10);

    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });
});
