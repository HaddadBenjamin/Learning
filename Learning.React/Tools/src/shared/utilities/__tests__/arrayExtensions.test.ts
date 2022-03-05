import addRangeWithoutDuplicate from '../array/addRangeWithoutDuplicate';
import distinctBy from "../array/distinctBy";

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
});
