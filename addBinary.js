let first = "1111"; //4
let second = "11";  //2

//"1111" + "11" -> "10010"
//
//1 xor 1 -> 1
//1 xor 0 -> 0
//0 xor 1 -> 0
//0 xor 0 -> 1
let add = function(a, b) {
    let posA = a.length, posB = b.length;
    let diff = posB - posA; //use diff as helper in indexing. have the while loop iterate over the longer string instead
    let carry = 0;
    while(posA --> 0 && posB --> 0) {
        let bitA = a[posA] === "1" ? 1 : 0;
        let bitB = b[posB] === "1" ? 1 : 0;
        let sum = +!(bitA ^ bitB);
        //1 + 1 = 0 
        //let sum = !(bitA ^ bitB) ^ carry;
    }
};

add(first, second);
