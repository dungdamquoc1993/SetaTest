

function setaNguHoc(rows, matrix) {
    let newMatrix = []
    for (let i = rows - 1; i > -1; i--) {
        let newRow = []
        for (let j = matrix[i].length - 1; j > -1; j--) {
            newRow.push(matrix[i][j])
        }
        newMatrix.push(newRow)
    }
    console.log(newMatrix)
}

setaNguHoc(3, [[9, 8, 7], [6, 5, 4], [3, 2, 1]])
