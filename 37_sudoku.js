const DIMENSION = 9;
const NCELLS = DIMENSION * DIMENSION;
const FREE = ".";

let finished = false;

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
        for(let i = 0; i < this.m.length; i++) {
            for(let j = 0; j < this.m[i].length; j++) {
                if(this.m[i][j] !== FREE) {
                    this.freeCount--;
                }
            }
        }
    }
    fillSquare(row, col, val) {
        this.m[row][col] = val;
        this.freeCount++;
    }
    freeSquare(row, col) {
        this.m[row][col] = FREE;
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

        //construct a set of all possible candidates for the (k + 1)th position. we'll iterate through all possible candidates, and then recursively call
        //backtrack with them
        ncandidates = constructCandidates(a, k, n, candidates);
        for(let i = 0; i < ncandidates; i++) {
            //appending to the end of current solution vector
            a[k] = candidates[i];
            backtrack(board, k);
        }
    }
};

let processSolution = function(board) {
    finished = true;
    board.print();
};

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let isSolution = function(board) {
    return board.freeCount === 0;
};

//n queens seems a lot like sudoku
let constructCandidates = function(a, k, n, candidates) {
    let ncandidates = 0;
    let legalMove = false;

    return ncandidates;
};

let solveSudoku = function(board) {
    let b = new Board(board);
    b.print();
    //let solutions = [];
    backtrack(board, NCELLS - b.freeCount);
    //return solutions;
};

let board = [
    [".",".","9","7","4","8",".",".","."],
    ["7",".",".",".",".",".",".",".","."],
    [".","2",".","1",".","9",".",".","."],
    [".",".","7",".",".",".","2","4","."],
    [".","6","4",".","1",".","5","9","."],
    [".","9","8",".",".",".","3",".","."],
    [".",".",".","8",".","3",".","2","."],
    [".",".",".",".",".",".",".",".","6"],
    [".",".",".","2","7","5","9",".","."]
];

solveSudoku(board);
