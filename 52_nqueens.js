//leetcode problem #52. N-Queens II. Same as N-Queens #51, just return total solution count
//JavaScript implementation of the general backtracking algorithm found in Steven Skiena's 'The Algorithm Design Manual 2nd Edition'
//The book: https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202
//9/9 test cases, 76ms runtime

//backtrack algorithm. generic across various problems, most of the work here happens in constructCandidates and and processSolution
//@param a: solution vector
//@param k: kth potential solution of solution vector a
//@param n: dimension of the board
let backtrack = function(a, k, n, solutions) {
    let candidates = [];                        //candidates for next position
    let ncandidates = 0;                        //next position candidate count

    if(isSolution(a, k, n)) {
        processSolution(a, k, n, solutions);
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
            backtrack(a, k, n, solutions);
        }
    }
};

let processSolution = function(a, k, n, solutions) {
    //same as previous solution, only we can take the work out of process solution. just update solution count
    //by appending to solution vector because laziness
    solutions.push(1);
}

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let isSolution = function(a, k, n) {
    return k === n;
};

//n queens seems a lot like sudoku
let constructCandidates = function(a, k, n, candidates) {
    let ncandidates = 0;
    let legalMove = false;

    //starting index at 1 for convenience

    //iterate through squares on the current row
    for(i = 1; i <= n; i++) {
        legalMove = true;
        for(j = 1; j < k; j++) {
            //diagonal threat
            if(Math.abs(k - j) === Math.abs(i - a[j])) {
                legalMove = false;
            }
            //column threat
            if(i === a[j]) {
                legalMove = false;
            }
            //only 1 queen per row, so no need to check for row threat
        }
        if(legalMove === true) {
            candidates[ncandidates] = i;
            ncandidates += 1;
        }
    }
    return ncandidates;
};

//@param n: dimension of the chessboard
//@return: 2-d array of strings representing the board state and queen positions
let solveNQueens = function(n) {
    let solutions = [];
    backtrack([], 0, n, solutions);
    return solutions.length;
};

let q4 = solveNQueens(4);
