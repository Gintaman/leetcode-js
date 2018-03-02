const DIMENSION = 9;
const NCELLS = DIMENSION * DIMENSION;
const FREE = ".";

class Square {
    constructor() {
        this.row = null;
        this.col = null;
    }
}

class Board {
    constructor(board) {
        this.m = board;
        this.freeCount = NCELLS;
        this.move = [];
        this.finished = false;
        for(let i = 0; i < this.m.length; i++) {
            for(let j = 0; j < this.m[i].length; j++) {
                if(this.m[i][j] !== FREE) {
                    this.freeCount--;
                }
            }
        }
    }
    fillSquare(row, col, val) {
        this.m[row][col] = String(val);
        this.freeCount--;
    }
    freeSquare(row, col) {
        this.m[row][col] = FREE;
        this.freeCount++;
    }
    getNextSquare() {
        for(let i = 0; i < this.m.length; i++) {
            for(let j = 0; j < this.m[i].length; j++) {
                if(this.m[i][j] === FREE) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }
    getPossibleValues(row, col) {
        let possible = [false, true, true, true, true, true, true, true, true, true];
        let currentRow = this.m[row];
        let currentCol = [];
        let currentSector = [];
        for(let i = 0; i < this.m.length; i++) {
            currentCol.push(this.m[i][col])
        }
        let sectorStart = { row: Math.floor(row / 3) * 3, col: Math.floor(col / 3) * 3 };
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                currentSector.push(this.m[sectorStart.row + i][sectorStart.col + j]);
            }
        }

        for(let i = 0; i < DIMENSION; i++) {
            if(currentRow[i] !== FREE) {
                possible[Number(currentRow[i])] = false;
            }
            if(currentCol[i] !== FREE) {
                possible[Number(currentCol[i])] = false;
            }
            if(currentSector[i] !== FREE) {
                possible[Number(currentSector[i])] = false;
            }
        }

        return possible;
    }
    print() {
        for(let i = 0; i < this.m.length; i++) {
            if(i === 3 || i === 6) {
                console.log("---------------------------------");
            }
            for(let j = 0; j < this.m[i].length; j++) {
                process.stdout.write(" " + this.m[i][j] + " ");
                if(j === 2 || j === 5) {
                    process.stdout.write(" | ");
                }
            }
            console.log();
        }
        console.log("Free: ", this.freeCount);
    }
}

let backtrack = function(board, k) {
    let candidates = [];                        //candidates for next position
    let ncandidates = 0;                        //next position candidate count

    //start out with 

    if(isSolution(board)) {
        processSolution(board);
    }
    else {
        //extend our partial solution by trying the (k + 1)th candidate
        k += 1;

        ncandidates = constructCandidates(board, k, candidates);
        for(let i = 0; i < ncandidates; i++) {
            //board.m[k] = candidates[i];
            //a[k] = candidates[i];
            let row = board.move[k].row;
            let col = board.move[k].col;
            board.m[row][col] = candidates[i];
            board.fillSquare(row, col, candidates[i]);
            backtrack(board, k);
            board.freeSquare(row, col);
            if(board.finished) {
                return;
            }
        }
    }
};

let processSolution = function(board) {
    board.finished = true;
    board.print();
};

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let isSolution = function(board) {
    return board.freeCount === 0;
};

//n queens seems a lot like sudoku
let constructCandidates = function(board, k, candidates) {
    let ncandidates = 0;

    let nextSquare = board.getNextSquare();
   
    if(nextSquare === null) {
        console.log("Error condition");
        return;
    }

    board.move[k] = {
        row: nextSquare.row,
        col: nextSquare.col
    };
    
    let possible = board.getPossibleValues(nextSquare.row, nextSquare.col, []);
    for(let i = 1; i < possible.length; i++) {
        if(possible[i] === true) {
            candidates.push(i);
            ncandidates++;
        }
    }

    return ncandidates;
};

let solveSudoku = function(board) {
    let b = new Board(board);
    b.print();
    backtrack(b, NCELLS - b.freeCount);
    //console.log(b.getNextSquare());
};

/*let board = [
    [".",".","9","7","4","8",".",".","."],
    ["7",".",".",".",".",".",".",".","."],
    [".","2",".","1",".","9",".",".","."],
    [".",".","7",".",".",".","2","4","."],
    [".","6","4",".","1",".","5","9","."],
    [".","9","8",".",".",".","3",".","."],
    [".",".",".","8",".","3",".","2","."],
    [".",".",".",".",".",".",".",".","6"],
    [".",".",".","2","7","5","9",".","."]
];*/

/*board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]*/

solveSudoku([[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]);
