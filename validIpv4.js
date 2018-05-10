function validOctet(octect) {
    if(octect.length < 0 || octect.length > 3) {
        return false;
    }
    let numVal = Number(octect);
    if(Number.isNaN(numVal) || numVal < 0 || numVal > 255) {
        return false;
    }
    return true;
}

function validIpv4(num) {
    if(!num || !num.length) return false;
    if(num.length > 12) return false;
    num = num.split('');

    let octects = 4;
    return canMakeOctect(num, octects);
}

function canMakeOctect(address, octects) {
    console.log(address, octects);
    if(octects > 0 && address.length === 0) return false;
    if(octects === 0 && address.length > 1) return false;
    if(octects === 0 && address.length === 0) return true;

    let currentOctect = [];
    while(currentOctect.length < 3 && address.length) {
        currentOctect.push(address.shift());
        if(validOctet(currentOctect)) {
            octects--;
            return canMakeOctect(address, octects);
        }
    }
}

console.log(validIpv4("127001"));
