//we'll keep an array of 4 octects, or 4 arrays of arrays
//[
//  ['1', '2', '7'],
//  ['0'],
//  ['0'],
//  ['1']
//]
//we'll do a backtrack dfs through each configuration.
//a solution is valid if its length is 4 (has 4 arrays as its elements, and each of its 4 arrays contain valid octects)

//for now we'll just do an array of strings

function isValid(addr) {
    if(addr.length !== 4) return false;
    for(let i = 0; i < addr.length; i++) {
        let numVal = Number(addr[i]);
        if(Number.isNaN(numVal) || numVal < 0 || numVal > 255) return false;
    }
    return true;
}

function validateIpv4(addr) {
    addr = addr.split('');
    backtrack([[], [], [], [], []], 0, addr);
}

function constructCandidates(a, k, addr) {
    return [];
}

let total = 0;
function backtrack(a, k, addr) {
    if(k === 4) {
        if(addr.length === 0 && isValid(a)) {
            console.log("valid ip");
        }
        else {
            //console.log("not valid", a, addr);
        }
    } 
    else {
        k += 1;
        while(a[k].length < 3 && addr.length) {
            a[k].push(addr.shift());
            console.log(a, addr)
            backtrack(a, k, addr);
        }
    }
}

//1 2 7 0   01


//127001
//1 27001
//1 2 7001
//1 2 7 001
//1 2 7 0 01
//12 7001
//127 001

console.log(validateIpv4('127001'));
