//longest palindromic substring using dynamic programming

//notice that (2,3) is the same result as (1, 2). we are doing redundant work here.

function lps(x, y) {
    let m = x.length;
    let n = y.length;

    let c = [];
    
    let longest = {
        len: 1,
        i: 1,
        j: 1
    };

    for(let i = 0; i <= m; i++) {
        let arr = [];
        let arr2 = [];
        for(let j = 0; j <= n; j++) {
            arr.push(0);
            arr2.push(0);
        }
        c.push(arr);
    }
    
    for(let i = 1; i <= m; i++) {
        c[i][i] = 1;
    }

    for(let i = 1; i < m; i++) {
        let k = 1;
        for(let j = i + 1; j <= n; j++) {
            if((j - k === 1 && x[k-1] === x[j-1]) || (x[k-1] === x[j-1] && c[k+1][j-1] === 1)) {
                c[k][j] = 1;
                let len = j - k + 1;
                if(len > longest.len) {
                    longest.len = len;
                    longest.i = k;
                    longest.j = j;
                }
            }
            k++;
        }
    }
    return { c, longest };
}

let longestPalindrome = function(s) {
    let res = lps(s, s);
    return s.substring(res.longest.i - 1, res.longest.j);
};

//console.log(longestPalindrome("abcda"));

//console.log(longestPalindrome("ababd"));

//console.log(longestPalindrome("racecarracecar"));

//console.log(longestPalindrome("abccba"));

//console.log(longestPalindrome("aaaa"));
//console.log(longestPalindrome("aaaaa"));
//console.log(longestPalindrome("aaaaaa"));

//console.log(longestPalindrome("babad"));

//console.log(longestPalindrome("cbbd"));

//console.log(longestPalindrome("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"));

