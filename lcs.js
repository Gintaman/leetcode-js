const DIAGONAL = 0;
const LEFT = 1;
const UP = 2;

function lcs(x, y) {
    let m = x.length;
    let n = y.length;

    let c = [];
    let b = [];

    for(let i = 0; i <= m; i++) {
        let arr = [];
        let arr2 = [];
        for(let j = 0; j <= n; j++) {
            arr.push(0);
            arr2.push(0);
        }
        c.push(arr);
        b.push(arr2);
    }

    /*for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            process.stdout.write(" " + c[i][j] + " ");
        }
        console.log("");
    }*/

    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(x[i-1] === y[j-1]) {
                console.log("Equal: ", x[i-1], y[j-1]);
                c[i][j] = c[i-1][j-1] + 1;
                b[i][j] = DIAGONAL;
            }
            //if the item above is greater than item to the left
            else if(c[i-1][j] >= c[i][j-1]) {
                console.log("Greater: ", x[i-1], y[j-1]);
                c[i][j] = c[i-1][j];
                b[i][j] = UP;
            }
            //otherwise item to the left is greater
            else {
                console.log("Less: ", x[i-1], y[j-1]);
                c[i][j] = c[i][j-1];
                b[i][j] = LEFT;
            }
        }
    }
    
    for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            process.stdout.write(" " + c[i][j] + " ");
        }
        console.log("");
    }

    return { b, c };
}

function printLcs(b, x, i, j, longest) {
    if(i === 0 || j === 0) 
        return;
    if(b[i][j] === DIAGONAL) {
        printLcs(b, x, i-1, j-1, longest);
        if(longest) {
            longest.push(x[i-1]);
        }
        else {
            console.log(x[i-1]);
        }
    }
    else if(b[i][j] === UP) {
        printLcs(b, x, i-1, j, longest);
    }
    else {
        printLcs(b, x, i, j-1, longest);
    }
}

let longestPalindrome = function(s) {
    let rs = s.split('').reverse().join('');
    let res = lcs(s, rs);
    let longest = [];
    printLcs(res.b, s, s.length, s.length, longest);
    return longest.join('');
};

console.log(longestPalindrome("abcda"));

//console.log(longestPalindrome("cbbd"));

//let res = lcs("amputation", "spanking");
//printLcs(res.b, "amputation", "amputation".length, "spanking".length);
//let res = lcs("cbbd", "dbbc");
//printLcs(res.b, "cbbd", "cbbd".length, "dbbc".length);
