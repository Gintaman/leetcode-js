let first = "1111"; //4
let second = "11";  //2
//first = "0";
//second = "0";
first = "1010";
second = "1011";

let add = function(a, b) {
    let posA = a.length, posB = b.length;
    let len = posA > posB ? posA : posB;
    let carry = 0;
    let res = "";
    while(len --> 0) {
        let bitA = 0, bitB = 0;
        if(posA >= 0) bitA = a[--posA] === "1" ? 1 : 0;
        if(posB >= 0) bitB = b[--posB] === "1" ? 1 : 0;
        let bsum = bitA ^ bitB ^ carry;
        carry = bitA + bitB + carry > 1 ? 1 : 0;
        res = bsum === 1 ? "1" + res : "0" + res;
    }
    if(carry) res = "1" + res;
    return res;
};

console.log(add(first, second));
