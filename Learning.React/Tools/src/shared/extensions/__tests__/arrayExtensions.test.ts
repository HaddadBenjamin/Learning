import {} from '../arrayExtensions';
import {range} from '../../helpers/arrayHelper';

describe('arrayExtensions', () => {
  it('skip should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.skip(3);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([4, 5, 6]);
  });

  it('take should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.take(3);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2, 3]);
  });

  it('skipWhen should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.skipWhen(element => element < 3);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([3, 4, 5, 6]);
  });

  it('takeWhen should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.takeWhen(element => element < 3);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2]);
  });

  it('select should be immutable', () => {
    // Given
    const expectedValue = [{ a: 1 }, { a: 2 }];
    const array = [{ a: 1 }, { a: 2 }];

    // When
    const actualValue = array.select(element => element.a);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2]);
  });

  it('selectMany should be immutable', () => {
    // Given
    const expectedValue = [{ a: [1] }, { a: [2] }];
    const array = [{ a: [1] }, { a: [2] }];

    // When
    const actualValue = array.selectMany(element => element.a);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2]);
  });

  it('selectMany should be immutable', () => {
    // Given
    const expectedValue = [{ a: 1 }, { a: 2 }];
    const array = [{ a: 1 }, { a: 2 }];

    // When
    const actualValue = array.any(element => element.a === 2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(true);
  });

  it('all should be immutable', () => {
    // Given
    const expectedValue = [{ a: 1 }, { a: 2 }];
    const array = [{ a: 1 }, { a: 2 }];

    // When
    const actualValue = array.all(element => element.a === 2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(false);
  });

  it('add should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.add(4);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2, 3, 4]);
  });

  it('addRange should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.addRange(4, 5, 6);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it('remove should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.remove(2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 3]);
  });

  it('removeWhen should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.removeWhen(element => element < 3);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([3, 4, 5, 6]);
  });

  it('where should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 2, 3];
    const array = [1, 2, 2, 3];

    // When
    const actualValue = array.where(element => element > 2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([3]);
  });

  it('distinct should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 2, 3];
    const array = [1, 2, 2, 3];

    // When
    const actualValue = array.distinct();

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2, 3]);
  });

  it('distinctBy should be immutable', () => {
    // Given
    const expectedValue = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];
    const array = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];

    // When
    const actualValue = array.distinctBy(element => element.a);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
  });

  it('first should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.first();

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(1);
  });

  it('firstOrDefault should be immutable', () => {
    // Given
    const expectedValue: number[] = [];
    const array: number[] = [];

    // When
    const actualValue = array.firstOrDefault(2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(2);
  });

  it('last should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.last();

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(3);
  });

  it('lastOrDefault should be immutable', () => {
    // Given
    const expectedValue: number[] = [];
    const array: number[] = [];

    // When
    const actualValue = array.lastOrDefault(2);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(2);
  });

  it('count should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.count();

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(3);
  });

  it('countBy should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3, 4, 5, 6];
    const array = [1, 2, 3, 4, 5, 6];

    // When
    const actualValue = array.countBy(element => element % 3 === 0);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(2);
  });

  it('orderBy should be immutable', () => {
    // Given
    const expectedValue = [4, 5, 6, 3, 2, 1];
    const array = [4, 5, 6, 3, 2, 1];

    // When
    const actualValue = array.orderBy(element => element);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it('orderBy should be immutable 2', () => {
    // Given
    const expectedValue = [
      { d: 36, index: 2 },
      { d: 42, index: 1 },
    ];
    const array = [
      { d: 36, index: 2 },
      { d: 42, index: 1 },
    ];

    // When
    const actualValue = array.orderBy(element => element.index);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([
      { d: 42, index: 1 },
      { d: 36, index: 2 },
    ]);
  });

  it('orderByDesc should be immutable', () => {
    // Given
    const expectedValue = [4, 5, 6, 3, 2, 1];
    const array = [4, 5, 6, 3, 2, 1];

    // When
    const actualValue = array.orderByDesc(element => element);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });

  it('orderByDesc should be immutable 2', () => {
    // Given
    const expectedValue = [
      { d: 36, index: 2 },
      { d: 42, index: 1 },
    ];
    const array = [
      { d: 36, index: 2 },
      { d: 42, index: 1 },
    ];

    // When
    const actualValue = array.orderByDesc(element => element.index);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([
      { d: 36, index: 2 },
      { d: 42, index: 1 },
    ]);
  });

  it('inverse should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.inverse();

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([3, 2, 1]);
  });

  it('toDictionary should be immutable', () => {
    // Given
    const expectedValue = [
      { a: 1, id: 0 },
      { a: 2, id: 1 },
    ];
    const array = [
      { a: 1, id: 0 },
      { a: 2, id: 1 },
    ];

    // When
    const actualValue = array.toDictionary(element => element.id);

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual(
      new Map([
        [0, { a: 1, id: 0 }],
        [1, { a: 2, id: 1 }],
      ])
    );
  });

  it('mapWithPrevious should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.mapWithPrevious((previous, current) =>
      previous ? previous + current : current
    );

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([1, 3, 5]);
  });

  it('filterWithPrevious should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];

    // When
    const actualValue = array.filterWithPrevious(previous =>
      previous ? previous > 1 : false
    );

    // Then
    expect(array).toStrictEqual(expectedValue);
    expect(actualValue).toStrictEqual([3]);
  });

  it('forEachWithPrevious should be immutable', () => {
    // Given
    const expectedValue = [1, 2, 3];
    const array = [1, 2, 3];
  
    // When
    array.forEachWithPrevious(previous => {
      if (previous && previous > 1) expect(previous).toBe(2);
    });
  
    // Then
    expect(array).toStrictEqual(expectedValue);
  });
  
  it('pagination should be immutable', () => {
    // Given
    const expectedValue = [21, 22, 23, 24, 25];
    const array = range(501);
    
    // When
    const actualValue = array.paginate(5, 5);
    
    // Then
    expect(actualValue).toStrictEqual(expectedValue);
  });
});
