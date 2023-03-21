// Ex :
//      [1, 2, 3]        [1, 4, 7]
//      [4, 5, 6]   =>   [2, 5, 8]
//      [7, 8, 9]        [3
const transpose = <T, >(matrix: T[][]) : T[][] => matrix.map((row, i) => row.map((_, j) => matrix[j][i]));

export default transpose;
