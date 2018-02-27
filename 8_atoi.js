//leetcode problem #8. String to Integer (atoi)
//javascript implementation of atoi
//1047/1047 test cases passed, ~80ms runtime. apparently its faster than 100% of all other js submissions, wonder how many there were...

let myAtoi = function(str) {
    //strip whitespace
    str = str.trim();
    let sign = 1;

    //strip '+' or '-'
    if(str[0] === '-' || str[0] === '+') {
        if(str[0] === '-') {
            sign = -1;
        }
        str = str.substring(1);
    }

    //strip any extra invalid characters after the integral part. ie: 123a5 -> 123
    for(let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if(charCode > 57 || charCode < 48) {
            str = str.substring(0, i);
            break;
        }
    }

    //check if we still have a valid string representation of a number after parsing
    if(!str.length) {
        return 0;
    }

    let num = 0;
    let place = 0;
    for(let i = str.length - 1; i >= 0; i--) {
        if(place === 0) {
            num += (str.charCodeAt(i) - 48);
        }
        else {
            num += Math.pow(10, place) * (str.charCodeAt(i) - 48);
        }
        place++;
    }

    num = num * sign;

    if(num > 2147483647) {
        return 2147483647;
    }
    if(num < -2147483648) {
        return -2147483648;
    }
    return num;
};
