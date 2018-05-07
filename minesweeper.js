const readline = require('readline');

const ROWS = 8;
const COLUMNS = 8;
const MAX_MINES = 10;
const STATES = {
    DEFAULT: 0,
    MINED: 1,
    CLEARED: 2
}
        
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class GameBoard {
    constructor() {
        this.grid = [];
        for(let i = 0; i < ROWS; i++) {
            let row = [];
            for(let k = 0; k < COLUMNS; k++) {
                row.push(new Tile(this, i, k));
            }
            this.grid.push(row);
        }

        let mines = MAX_MINES;
        this.minedTiles = [];
        while(mines > 0) {
            let mineLocation = Math.floor(Math.random() * (ROWS * COLUMNS));
            if(!this.minedTiles.includes(mineLocation)) {
                this.minedTiles.push(mineLocation);
                let x = Math.floor(mineLocation / ROWS);
                let y = mineLocation % COLUMNS;
                this.grid[x][y].setMined();
                mines--;
            }
        }
    }
    gameOver(lost) {
        if(lost) {
            console.log("Sorry, you lost!");
            rl.close();
            process.exit(0);
        }
    }
    start() {
        console.log("Enter a location separated by a comma, ie: 0,1");
        this.print();
        rl.on('line', (input) => {
            if(input) {
                let location = ("" + input).split(',');
                if(location.length !== 2) {
                    console.log("Bad input. Enter a location separated by a comma, ie: 0,1");
                    this.print();
                    return;
                }
                else {
                    let x = Number(location[0]), y = Number(location[1]);
                    if(!isNaN(x) && !isNaN(y) && isValidLocation(x, y)) {
                        this.selectTile(x, y);
                        this.print();
                        if(this.checkIfGameOver()) {
                            console.log("You're winner!");
                            rl.close();
                            process.exit(0);
                        }
                    }
                    else {
                        console.log("Bad input");
                        this.print();
                        return;
                    }
                }
            }
        });
    }
    checkIfGameOver() {
        for(let i = 0; i < ROWS; i++) {
            for(let k = 0; k < COLUMNS; k++) {
                if(this.grid[i][k].value === '#') {
                    return false;
                }
            }
        }
        return true;
    }
    visitTile(x, y) {
        if(this.grid[x][y].value === "#") {
            this.grid[x][y].visit();
        }
    }
    selectTile(x, y) {
        this.grid[x][y].visit(true);
    }
    checkTile(x, y) {
        return this.grid[x][y].getMined();
    }
    print() {
        for(let i = 0; i < ROWS; i++) {
            for(let k = 0; k < COLUMNS; k++) {
                this.grid[i][k].display();
            }
            console.log('\n');
        }
    }
}

let isValidLocation = function(x, y) {
    return ((x >= 0 && x < ROWS) && (y >= 0 && y < ROWS));
}

//when a user selects a tile:
//if that tile is mined, end the game
//else:
//  check that tiles neighbors. if any neighbor contains a mine, replace that tile with the number of mined neighbors
//      if there are no mined neighbors, show a blank. then, visit each of the neighbors, and repeat

//there are two ways of visiting a tile. from the user selecting it, or from it being recursively called from a neighboring tile.
//if it has been called from a neighboring tile, it is guaranteed to not be mined

class Tile {
    constructor(parent, x, y) {
        this.parent = parent;
        this.currentState = STATES.DEFAULT;
        this.value = "#";

        this.x = x;
        this.y = y;
        this.neighbors = [];
        for(let i = -1; i < 2; i++) {
            for(let k = -1; k < 2; k++) {
                if(i === 0 && k === 0) 
                    continue;
                if(isValidLocation(this.x + i, this.y + k)) 
                    this.neighbors.push({x: this.x + i, y: this.y + k});
            }
        }
        this.mined = false;
        this.visited = false;
    }
    setMined() {
        this.mined = true;
        //this.value = "!";
    }
    getMined() {
        return this.mined;
    }
    visit(userSelected) {
        if(this.visited) {
            return;
        }
        this.visited = true;
        if(userSelected) {
            if(this.mined) {
                this.parent.gameOver(true);
                return;
            }
            else {
                this.checkNeighbors();
            }
        }
        else {
            this.checkNeighbors();
        }
    }
    checkNeighbors() {
        for(let i = 0; i < this.neighbors.length; i++) {
            this.minedAdjacentTiles = this.minedAdjacentTiles || 0;
            if(this.parent.checkTile(this.neighbors[i].x, this.neighbors[i].y)) {
                this.minedAdjacentTiles++;
            }
        }
        if(this.minedAdjacentTiles) {
            this.value = this.minedAdjacentTiles;
        }
        else {
            this.value = ".";
            for(let i = 0; i < this.neighbors.length; i++) {
                if(!this.parent.checkTile(this.neighbors[i].x, this.neighbors[i].y)) {
                    this.parent.visitTile(this.neighbors[i].x, this.neighbors[i].y);
                }
            }
        }
    }
    display() {
        process.stdout.write(` ${this.value} `);
    }
}

let g = new GameBoard();
g.start();
