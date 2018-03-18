let printTable = function(c, m, n) {
    for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            process.stdout.write(" " + c[i][j] + " ");
        }
        console.log();
    }
}

let lcs = function(x, y) {
    let m = x.length;
    let n = y.length;

    let c = [];
    
    let max = {
        len: 0,
        i: 0,
        j: 0
    };

    for(let i = 0; i <= m; i++) {
        let row = [];
        for(let j = 0; j <= n; j++) {
            row.push(0);
        }
        c.push(row);
    }
    
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(x[i-1] === y[j-1]) {
                c[i][j] = c[i-1][j-1] + 1;
                if(c[i][j] > max.len) {
                    max.len = c[i][j];
                    max.i = i;
                    max.j = j;
                }
            }
        }
    }
    
    printTable(c, m, n);

    let res = "";
    if(max.len === 0) return res;

    for(let i = 0; i < max.len; i++) {
        res = x[max.i-1] + res;
        max.i--;
    }
    return res;
};

console.log(lcs("zbcdf", "abcdaf"));
console.log(lcs("aaaaa", "aaaaaa"));
console.log(lcs("aaaaaa", "aaaaa"));
console.log(lcs("aaaaaa", "aaaaaa"));
