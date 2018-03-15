//we need to add an additional string that the sequence must be sequential...
//everywhere where the characters are equal, we need to add another constraint that the previous must all be equal...

const DIAGONAL = 0;
const LEFT = 1;
const UP = 2;

//this is the table for lcs
/*
  a  b  c  d  a
a 1  1  1  1  1
d 1  1  1  2  2
c 1  1  2  2  2
b 1  2  2  2  2
a 1  2  2  2  3
*/
//each index i,j denotes the characters from row[i] to column[j]
//for example, for i = 2, j = 3, the partial string is "bcd"
//this makes intuitive sense, since an nxn matrix of characters here denotes all the possible n^2 combinations?
//
//what we're really going is starting with all substrings of length '1', confirming whether or not they're palindromes,
//and then building up the substrings. don't think of this being similar to lcs, think of it as a completely different modeling...
//we're NOT just simply running lcs with the same string reversed. although that would give us a correct result for the problem
//of finding the longest palindromic subsequence, not the longest palindromic substring.
//for longest palindromic substring, we'll label the rows and columns with the same string, and each entry in the matrix
//will be a true or false indicating whether the substring from index i to j is a palindrome or not.
//so like we said above, we first start calculating the subproblems, that is finding all the palindromes of substrings of length 1,
//and then slowly building up our substrings.
//0 will denote false, 1 denote true. 
//
//the #'s denotes the empty string
//first, we can mark all substrings of single characters as palindromes
//[1][1] = 'a', [2][2] = 'b', [3][3] = 'c', [4][4] = 'd', [5][5] = 'a' are all palindromes. [0][0] is the empty string which is a palindrome
//the first row and first columns are all marked 0, which is correct, because they denote the empty string. is this true?
//maybe we think of it like this. first, before we start the main loop, we initialize the diagonal to be all 1's, since all substrings of length 1
//are palindromes.

//above may not be correct. try this first.
//start loop at i = 1, j = 1;
//c[1][1] denotes the string from index 1 to 1 inclusive, which is 'c'. 'c' is a palindrome, so we mark it as 1.
//next, i = 1, j = 2
//c[1][2] denotes the string from index 1 to 2, which is 'cb'. 'cb' is not a palindrome, mark it as 0. same for rest of this row, 'cbb', 'cbbd' are all not palindromes
//seems like we can ignore the values below the diagonal
//c[2][2] = 'b', which is a palindrome, so we mark it 1

/*
 *    # c b b d      
 *  # 1 0 0 0 0      
 *  c 0 1 0 0 0      
 *  b 0 0 0 0 0      
 *  b 0 0 0 0 0      
 *  d 0 0 0 0 0      
 */

//c looks like this after i = 1.
//continue with i = 2. we're ignoring values below the diagonal, which is all values j >= i
//continue with c[2][2] = 'b'. 'b' is a palindrome, mark it 1.
//next we check c[2][3] = 'bb', which is a palindrome, mark it 1.

/* this is what c looks like after iteration of i = 2
 *   |# c b b d      
 *  #|1 0 0 0 0      
 *  c|0 1 0 0 0      
 *  b|0 0 1 1 0      
 *  b|0 0 0 0 0      
 *  d|0 0 0 0 0      
 */

let isPalindrome = function(str) {
    let start = 0, end = str.length - 1;
    while(start < end) {
        if(str[start] !== str[end]) return false;
        start++;
        end--;
    }
    return true;
}

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
    let f = [];

    //this is a basic bruteforce solution... need to optimize by memoizing.
    //actually this gives us a basic scaffolding of the redblueredblue problem

    //console.log(c);
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(j >= i) {
                console.log("comparing: ", x.substring(i-1, j));
                if(isPalindrome(x.substring(i-1, j))) {
                    //console.log("Is a palindrome!: ", x.substring(i-1, j));
                    //console.log("is a palindrome: ", x.substring(i-1, j), " string indices from ", i-1, " to ", (j));
                    c[i][j] = 1;//c[i][j-1] + 1;
                    let str = x.substring(i-1, j);
                    let len = str.length;
                    f.push({
                        i, j, len, str
                    });
                    //b[i][j] = LEFT;
                    //c[i][j] = c[i-1][j-1] + 1;;
                }
                else {
                }
            }
            /*if(x[i-1] === y[j-1]) {
                console.log("Equal: ", x[i-1], y[j-1], i-1, j-1);
                c[i][j] = c[i-1][j-1] + 1;
                b[i][j] = DIAGONAL;
                //this needs to change...
            }
            //if the item above is greater than item to the left
            else if(c[i-1][j] >= c[i][j-1]) {
                //console.log("Greater: ", x[i-1], y[j-1]);
                c[i][j] = c[i-1][j];
                b[i][j] = UP;
            }
            //otherwise item to the left is greater
            else {
                //console.log("Less: ", x[i-1], y[j-1]);
                c[i][j] = c[i][j-1];
                b[i][j] = LEFT;
            }*/
        }
    }
    //console.log(c);
    
    /*for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            if(i === 0) {
                if(j > 0) {
                    process.stdout.write(" " + x[j-1] + " ");
                }
                else {
                    process.stdout.write(" ");
                }
            }
            else if(j === 0) {
                process.stdout.write("" + y[i-1]);
            }
            else{
                process.stdout.write(" " + c[i][j] + " ");
            }
        }
        console.log("");
    }*/

    return { b, c, f };
}

function printLcs(c, x, i, j, f, longest) {
    //maybe we're looking for the most top right element marked as 1 that's strictly right of the diagonal?
    
    let target = {
        i: 1,
        j: 1
    };

    f = f.sort((a, b) => { return b.len - a.len });

    let res = {};
    
    let results = [];
    for(let i = 1; i < c.length; i++) {
        let result = [];
        for(let j = i; j < c[i].length; j++) {
            if(c[i][j] !== 0) {
                result.push({i, j});
                //process.stdout.write(" " + c[i][j] + " ");
            }
        }
        results.push(result);
        //console.log();
    }
    results = results.sort((a, b) => { return b.length - a.length });
    //console.log(results);
    let str = results[0][results[0].length - 1];
    //console.log(x.substring(str.i - 1, str.j));
    //return x.substring(str.i - 1, str.j);

    return f[0].str;

    /*console.log(`[${i}, ${j}], ${b[i][j]}`);
    if(i === 0 || j === 0) 
        return;
    if(b[i][j] === DIAGONAL) {
        console.log("Diagonal");
        //console.log("DIAGONAL: ", x[i-1], x[j-1]);
        printLcs(b, x, i-1, j-1, longest);
        j
        if(longest) {
            longest.push(x[i-1]);
            console.log("Found at partial solution " + x[i-1] + " at: ", `[${i}, ${j}]`);
        }
        else {
            console.log("Found at: ", b[i][j]);
            console.log(x[i-1]);
        }
    }
    else if(b[i][j] === UP) {
        console.log("Up");
        printLcs(b, x, i-1, j, longest);
    }
    else {
        console.log("Left");
        printLcs(b, x, i, j-1, longest);
    }*/
}

let longestPalindrome = function(s) {
    //let rs = s.split('').reverse().join('');
    let res = lcs(s, s);
    let longest = [];
    let str = printLcs(res.c, s, s.length, s.length, res.f, longest);
    return str;
};

//console.log(longestPalindrome("abcda"));

//console.log(longestPalindrome("abad"));
//
//console.log(longestPalindrome("bsracecaraxzaf"));

//console.log(longestPalindrome("abccba"));

console.log(longestPalindrome("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));

console.log(longestPalindrome("babad"));

//console.log(longestPalindrome("cbbd"));

//let res = lcs("amputation", "spanking");
//printLcs(res.b, "amputation", "amputation".length, "spanking".length);
//let res = lcs("cbbd", "dbbc");
//printLcs(res.b, "cbbd", "cbbd".length, "dbbc".length);
