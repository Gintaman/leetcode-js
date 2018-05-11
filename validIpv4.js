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
    backtrack(['', [], [], [], []], 0, addr);
}

function constructCandidates(a, k, addr) {
    console.log(k);
    let len = a[k].length;
    let candidates = [];
    for(let i = 0; i < 3 - len; i++) {
        candidates.push(addr[i]);
    }
    //console.log(candidates)
    return candidates;
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

        /*for(let i = a[k].length; i < 3; i++) {
            a[k].push(addr.shift());
            console.log(a, k);
            backtrack(a, k, addr);
            addr.unshift(a[k].pop());
        }*/

        //TODO maybe we shouldn't be taking elements out of addr? or if we take something out of addr, we need to push it back in if we take back the move
        let candidates = constructCandidates(a, k, addr);
        for(let i = 0; i < candidates.length; i++) {
            a[k].push(candidates[i]);
            console.log(a, k);
            backtrack(a, k, addr);
            a[k].pop();
            /*a[k].push(addr.shift());
            //console.log(a, k);
            backtrack(a, k, addr);
            addr.unshift(a[k].pop());*/
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

//console.log(validateIpv4('1111'));
console.log(validateIpv4('127001'));
