// a. IO:
// i. Input : { matrixDimension: int, matrix: array }
// ii. Output: The Matrix Inversion
// b. Example:
// i. matrixDimension: 3
// ii. matrix: [[1,2,3],[4,5,6],[7,8,9]]
// iii. result expected: [[9,8,7],[6,5,4],[3,2,1]]

function matrixInversion(matrixDimension, matrix) {
    try {
        if (matrixDimension != matrix.length) {
            return 'the input is invalid'
        }
        matrix = matrix.reverse()
        for (let i = 0; i < matrixDimension; i++) {
            matrix[i].reverse()
        }
        return matrix
    } catch (error) {
        console.log(error)
    }
}

console.log(matrixInversion(4, [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [10, 11, 12]]))