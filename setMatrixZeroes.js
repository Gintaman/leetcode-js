let setZeroes = function(matrix) {
    let toFill = [];
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 0) {
                toFill.push({row: i, col: j})
            }
        }
    }

    let numRows = matrix.length;
    let numCols = 0;
    if(numRows) {
        numCols = matrix[0].length;
    }

    for(let i = 0; i < toFill.length; i++) {
        let row = toFill[i].row;
        let col = toFill[i].col;
        if(numRows > 0) {
            for(let j = 0; j < matrix[row].length; j++) {
                matrix[row][j] = 0;
            }
        }
        if(numCols > 0) {
            for(let j = 0; j < matrix.length; j++) {
                matrix[j][col] = 0;
            }
        }
    }

    /*
    console.log("");
    for(let i = 0; i < matrix.length; i++) {
        let row = [];
        for(let j = 0; j < matrix[i].length; j++) {
            process.stdout.write(" " + matrix[i][j] + " ");
        }
        console.log();
    }
    */
};

//setZeroes([[1,3,0]]);
//setZeroes([[-4,-2147483648,6,-7,0],[-8,6,-8,-6,0],[2147483647,2,-9,-6,-10]]);
