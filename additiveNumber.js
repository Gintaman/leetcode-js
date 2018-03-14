let isValid = function(x1, x2, start, num) {
    if(start === num.length) return true;
    x2 = x2 + x1;
    x1 = x2 - x1;
    let sum = String(x2);
    return num.startsWith(sum, start) && isValid(x1, x2, start + sum.length, num);
};

var isAdditiveNumber = function(num) {
    let n = num.length;
    for(let i = 1; i <= Math.floor(n / 2); ++i) {
        if(num[0] === '0' && i > 1) return false;
        let x1 = num.substring(0, i);
        for(let j = 1; Math.max(j, i) <= n - i - j; ++j) {
            if(num[i] === '0' && j > 1) break;
            let x2 = num.substring(i, i + j);
            if(isValid(x1, x2, j + i, num)) return true;
        }
    }
    return false;
};

console.log(isAdditiveNumber("199100199"));
