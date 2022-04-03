import addRangeWithoutDuplicate from '../array/addRangeWithoutDuplicate';
import distinctBy from "../array/distinctBy";
import containsAll from "../array/containsAll";
import groupBy from "../array/groupBy";
import swap from "../array/swap";
import swapIndex from "../array/swapIndex";

describe('arrayExtension', () => {
  it("addRangeWithoutDuplicate'", () => {
    // Given & When
    const result = addRangeWithoutDuplicate([{a: 1, id: 1}], [
      {a: 1, id: 1},
      {a: 2, id: 2},
    ], (a, b) => a.id === b.id)
    const expected = [{a: 1, id: 1}, {a: 2, id: 2} ];

    expect(result).toStrictEqual(expected)
  });

  it("distinctBy'", () => {
    // Given & When
    const result = distinctBy([
      {a: 1, id: 1},
      {a: 1, id: 1},
      {a: 2, id: 2}],
      (a, b) => a.id === b.id)
    const expected = [{a: 1, id: 1}, {a: 2, id: 2} ];

    expect(result).toStrictEqual(expected)
  });

  it("containsAll'", () => {
    // Given & When & Then
    expect(containsAll([1,2,3], [1, 2])).toStrictEqual(true)
    expect(containsAll([1,2,3], [1, 2, 4])).toStrictEqual(false)
  });

  it("groupBy'", () => {
    // Given & When
    const result = groupBy([
        {a: 1, id: 1},
        {a: 2, id: 1},
        {a: 3, id: 2}],
      a => a.id)
    const expected = [
      { key : 1, value : [{a: 1, id: 1}, {a: 2, id: 1}] },
      { key : 2, value : [{a: 3, id: 2}] },
    ];

    expect(result).toStrictEqual(expected)
  });

  it("swap", () => {
    // Given & When
    const result = swap([1, 2, 3,  4, 5], 1, 5)
    const expected = [5, 1,  2, 3, 4]

    expect(result).toStrictEqual(expected)
  });

  it("swapIndex", () => {
    // Given & When
    const result = swapIndex([1, 2, 3,  4, 5], 0, 4)
    const expected = [5, 1,  2, 3, 4]

    expect(result).toStrictEqual(expected)
  });
});
