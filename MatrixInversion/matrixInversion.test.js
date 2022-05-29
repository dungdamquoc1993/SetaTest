const { exportAllDeclaration } = require('@babel/types')
const matrixInversion = require('./matrixInversion')

describe("test inverse matrix", () => {
    it('should equal [ [ 12, 11, 10 ], [ 9, 8, 7 ], [ 6, 5, 4 ], [ 3, 2, 1 ] ]', () => {
        const result = matrixInversion.matrixInversion(4, [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [10, 11, 12]])
        const isPass = result == [[ 12, 11, 10 ],[ 9, 8, 7 ],[ 6, 5, 4 ],[ 3, 2, 1 ]]
        console.log(isPass)
        expect(JSON.stringify(result)).toBe(JSON.stringify([[ 12, 11, 10 ],[ 9, 8, 7 ],[ 6, 5, 4 ],[ 3, 2, 1 ]]))
    })
} )